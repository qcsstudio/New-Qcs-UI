"use client";
import { useEffect, useState, useRef } from "react";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { FilterMatchMode } from 'primereact/api';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Editor } from '../JoditEditor/JoditEditor';



const JobPostForm = () => {
  // State Management
  const [jobs, setJobs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    heading: "",
    description: "",
    location: "",
    experience: "",
    skills: "",
    workHours: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const toast = useRef(null);

  // Fetch Jobs with error handling
  const fetchJobs = async () => {
    try {
      const response = await fetch("/api/career");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
      showToast('error', 'Fetch Error', 'Failed to load job postings. Please try again.');
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Toast Notification
  const showToast = (severity, summary, detail) => {
    toast.current.show({ severity, summary, detail, life: 3000 });
  };

  // Form Validation
  const validateForm = () => {
    const requiredFields = ['heading', 'description', 'location', 'experience', 'skills', 'workHours'];
    const missingFields = requiredFields.filter(field => !formData[field] || formData[field].toString().trim() === '');

    if (missingFields.length > 0) {
      showToast('warn', 'Validation Error', `Missing required fields: ${missingFields.join(', ')}`);
      return false;
    }
    return true;
  };

  // Form Submit Handler with improved error handling
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const url = editingId
        ? `/api/career/${encodeURIComponent(editingId)}`
        : "/api/career";
      const method = editingId ? "PUT" : "POST";

      console.log("Submitting with:", { url, method, data: formData }); // Debug log

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || result.message || 'Failed to save job');
      }

      showToast(
        'success',
        'Success',
        editingId ? 'Job updated successfully' : 'Job created successfully'
      );

      setModalOpen(false);
      resetForm();
      await fetchJobs(); // Ensure fresh data is loaded
    } catch (error) {
      console.error("Submission error:", error);
      showToast('error', 'Submission Error', error.message);

      // Special handling for update conflicts
      if (editingId && error.message.includes('heading')) {
        fetchJobs(); // Refresh data if heading conflict
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Job with confirmation
  const handleDelete = (job) => {
    confirmDialog({
      message: 'Are you sure you want to delete this job posting?',
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      acceptClassName: 'p-button-danger',
      accept: async () => {
        try {
          const response = await fetch(
            `/api/career/${encodeURIComponent(job.heading)}`,
            { method: "DELETE" }
          );

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to delete job');
          }

          showToast('success', 'Success', 'Job deleted successfully');
          await fetchJobs();
        } catch (error) {
          console.error("Delete error:", error);
          showToast('error', 'Delete Error', error.message);
        }
      }
    });
  };

  // Edit Job - Load data into form
  const handleEdit = (job) => {
    setFormData({
      heading: job.heading,
      description: job.description,
      location: job.location,
      experience: job.experience,
      skills: job.skills,
      workHours: job.workHours
    });
    setEditingId(job.heading);
    setModalOpen(true);
  };

  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      heading: "",
      description: "",
      location: "",
      experience: "",
      skills: "",
      workHours: ""
    });
    setEditingId(null);
  };

  // Search Functionality
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters['global'].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  // Table Header with Search
  const renderHeader = () => {
    return (
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className={`text-2xl font-bold font-unbounded`}>Job Postings</h2>
        <span className="p-input-icon-left w-full md:w-auto">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Search jobs..."
            className="w-full"
          />
        </span>
      </div>
    );
  };

  // Table Columns Templates
  const descriptionBodyTemplate = (rowData) => {
    return (
      <div
        className="line-clamp-2 max-w-xs"
        dangerouslySetInnerHTML={{ __html: rowData.description }}
      />
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-button-text"
          onClick={() => handleEdit(rowData)}
          tooltip="Edit"
          tooltipOptions={{ position: 'top' }}
          aria-label="Edit"
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger p-button-text"
          onClick={() => handleDelete(rowData)}
          tooltip="Delete"
          tooltipOptions={{ position: 'top' }}
          aria-label="Delete"
        />
      </div>
    );
  };

  const header = renderHeader();

  return (
    <div className="p-4 md:p-6">
      <Toast ref={toast} position="top-right" />
      <ConfirmDialog />

      {/* DataTable */}
      <div className="card">
        <DataTable
          value={jobs}
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ minWidth: '50rem' }}
          filters={filters}
          filterDisplay="menu"
          globalFilterFields={['heading', 'location', 'experience', 'skills']}
          header={header}
          emptyMessage="No job postings found."
          loading={jobs.length === 0}
          scrollable
          scrollHeight="flex"
          responsiveLayout="scroll"
        >
          <Column field="heading" header="Position" sortable style={{ width: '20%' }} />
          <Column field="location" header="Location" sortable style={{ width: '15%' }} />
          <Column field="experience" header="Experience" sortable style={{ width: '15%' }} />
          <Column field="skills" header="Skills" sortable style={{ width: '15%' }} />
          <Column
            field="description"
            header="Description"
            body={descriptionBodyTemplate}
            style={{ width: '25%' }}
          />
          <Column
            body={actionBodyTemplate}
            header="Actions"
            style={{ width: '10%' }}
            exportable={false}
          />
        </DataTable>
      </div>

      {/* Floating Add Button */}
      <Button
        icon="pi pi-plus"
        className="p-button-rounded p-button-raised fixed bottom-5 right-5 shadow-lg p-button-border border-red-400"
        onClick={() => {
          resetForm();
          setModalOpen(true);
        }}
        tooltip="Add New Job"
        aria-label="Add Job"
      />

      {/* Job Form Dialog */}
      <Dialog
        visible={modalOpen}
        onHide={() => {
          setModalOpen(false);
          resetForm();
        }}
        style={{ width: '50vw' }}
        header={editingId ? "Edit Job Posting" : "Add Job Posting"}
        modal
        className="p-fluid"
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        dismissableMask
        closeOnEscape
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Job Title */}
          <div className="field">
            <label htmlFor="heading" className="font-medium block mb-2">
              Job Title *
            </label>
            <InputText
              id="heading"
              value={formData.heading}
              onChange={(e) =>
                setFormData({ ...formData, heading: e.target.value })
              }
              required
              disabled={!!editingId}
              className="w-full"
              aria-describedby="heading-help"
            />
            <small id="heading-help" className="p-error block mt-1">
              {!formData.heading && 'Job title is required'}
            </small>
          </div>

          {/* Job Description */}
          <div className="field">
            <label htmlFor="description" className="font-medium block mb-2">
              Description *
            </label>
          
            <Editor
              content={formData} setContent={setFormData}
            />
            <small className="p-error block mt-1">
              {!formData.description && 'Description is required'}
            </small>
          </div>

          {/* Location */}
          <div className="field">
            <label htmlFor="location" className="font-medium block mb-2">
              Location *
            </label>
            <InputText
              id="location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              required
              className="w-full"
            />
          </div>

          {/* Experience */}
          <div className="field">
            <label htmlFor="experience" className="font-medium block mb-2">
              Experience Required *
            </label>
            <InputText
              id="experience"
              value={formData.experience}
              onChange={(e) =>
                setFormData({ ...formData, experience: e.target.value })
              }
              required
              className="w-full"
            />
          </div>

          {/* Skills */}
          <div className="field">
            <label htmlFor="skills" className="font-medium block mb-2">
              Required Skills *
            </label>
            <InputText
              id="skills"
              value={formData.skills}
              onChange={(e) =>
                setFormData({ ...formData, skills: e.target.value })
              }
              required
              className="w-full"
            />
          </div>

          {/* Work Hours */}
          <div className="field">
            <label htmlFor="workHours" className="font-medium block mb-2">
              Work Hours *
            </label>
            <InputText
              id="workHours"
              value={formData.workHours}
              onChange={(e) =>
                setFormData({ ...formData, workHours: e.target.value })
              }
              required
              className="w-full"
            />
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button
              label="Cancel"
              icon="pi pi-times"
              className="p-button-text"
              onClick={() => {
                setModalOpen(false);
                resetForm();
              }}
              type="button"
              disabled={isSubmitting}
            />
            <Button
              label={isSubmitting ? "Processing..." : "Save"}
              icon="pi pi-check"
              type="submit"
              loading={isSubmitting}
              disabled={isSubmitting}
            />
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default JobPostForm;