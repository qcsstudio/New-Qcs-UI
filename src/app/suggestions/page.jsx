"use client";
import { useEffect, useState } from "react";
import LinkedInProfileHeader from "../../components/suggestion/LinkedInProfileHeader/LinkedInProfileHeader";
import ExperienceSection from "../../components/suggestion/ExperienceSection";
import ProfileSection from "../../components/suggestion/ProfileSection";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { DNA } from "react-loader-spinner";

export default function Suggestions() {
  const [resData, setResData] = useState(null);

  const [showFullAboutUpdated, setShowFullAboutUpdated] = useState(false);
    const [showAllExperience, setShowAllExperience] = useState(false);
    const [showAllSkills, setShowAllSkills] = useState(false);
  
    const router = useRouter();

     useEffect(() => {
        if (resData) {
          document.body.style.overflow = "auto";
        }
      }, [resData]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {

        const token = localStorage.getItem("token");

        if (!token) {
          console.log(" Token not found in localStorage");
             router.push("/login");
          return;
        }

        // API call
        const response = await fetch(
          "https://analyzer.qcsstudio.com/api/analyze/suggestions",
          {
            method: "POST", // API POST expect karti hai
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        //    if (response.status === 403) {
        //   console.log("⚠️ Payment required");
        //   router.push("/payment");
        //   return;
        // }

         if (!response.ok) {
        console.error("API Error:", response.status);
        return;
      }

        const data = await response.json();
        setResData(data);

        console.log("✅ API Response:", data);
        localStorage.removeItem("linkedin_audit_url");
        localStorage.removeItem("linkedin_audit_role");

      } catch (error) {
        console.error(" Network / JS Error:", error);
      }
    };

    fetchSuggestions();
  }, []);

  const experienceData = resData?.original?.profile?.experience || [];
  const profile_pic = resData?.original?.profile?.profile_picture || "";
  const educationData = resData?.original?.profile?.education || [];
  const skillsData = resData?.original?.profile?.skills || [];
  const aboutData = resData?.original?.profile?.about || [];
  const experienceDataUpdated = resData?.improved?.profile?.experience || [];
  const profile_picvUpdated = resData?.improved?.profile?.profile_picture || [];
  const educationDataUpdated = resData?.improved?.profile?.education || [];
  const skillsDataUpdated = resData?.improved?.profile?.skills || [];
  const aboutDataUpdated = resData?.improved?.profile?.about || [];

   const renderAboutText = (text, expanded, setExpanded) => {
    if (!text) {
      return <p className="text-muted">No about information available.</p>;
    }

    // ✅ Ensure string
    const aboutString = Array.isArray(text)
      ? text.join(" ")
      : String(text);

    const words = aboutString.split(" ");
    const isLong = words.length > 20;
    const shortText = words.slice(0, 20).join(" ");

    return (
      <p className="text-muted">
        {expanded || !isLong ? aboutString : `${shortText}...`}

        {isLong && (
          <span
            className="text-primary ms-2"
            style={{ cursor: "pointer", fontWeight: 500 }}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "See less" : "See more"}
          </span>
        )}
      </p>
    );
  };

  // experience
  const visibleExperience = showAllExperience
    ? experienceData
    : experienceData.slice(0, 1);

  //skills
  const visibleSkills = showAllSkills
    ? skillsData
    : skillsData.slice(0, 5);

  //updated skills
  const Updated_visibleSkills = showAllSkills
    ? skillsDataUpdated
    : skillsDataUpdated.slice(0, 5);

 if (!resData) {
    return (
      <>


        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <DNA
            visible={true}
            height="100"
            width="100"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </div>
        {/* <h1 className='text-black'>Please Wait...</h1> */}
      </>
    );
  }


 return (
  <>
  {/* <LinkedInProfileHeader data={resData}/> */}
   {/* <ProfileSection data={resData}/> */}
    <div className='container d-flex gap-1 '>
   
   
           <div className='row'>
   
             {/* original ==================================  */}
             <div className='col-lg-6 col-12'>
   
               <div className=" my-5">
                 <div className="profile-card shadow-sm rounded-4 overflow-hidden">
   
                   {/* ===== Cover Section ===== */}
                   <div className="cover-section position-relative">
                     <div className="cover-overlay"></div>
   
                     {/* Badge */}
                     {/* <span className="designer-badge">Designer</span> */}
   
                     {/* Profile Image */}
                     <div className="profile-img-wrapper">
                       <Image
                         // src="/profile.jpg"   
                         src={profile_pic}
                         alt="Profile"
                         width={120}
                         height={120}
                         className="profile-img border"
                       />
                     </div>
   
                     {/* Headline */}
                     <div className="cover-text">
   
                     </div>
                   </div>
   
                   {/* ===== Content Section ===== */}
                   <div className="p-4 pt-5">
                     <div className="row">
                       <div className="col-md-8">
                         <h3 className="fw-bold mb-1">{resData?.original?.profile?.name}</h3>
                         <p className="text-muted mb-1 d-flex justify-content-between">{resData?.original?.profile?.headline} <span className='fw-normal text-black fs-1'>{resData?.original?.score?.sections?.headline}</span></p>
                         <p className="text-muted">
                           {resData?.original?.profile?.location} <span className="text-primary">Contact info</span>
                         </p>
   
                         <p className="text-muted mt-2">{resData?.original?.profile?.connections}</p>
   
                         <div className="d-flex gap-2 mt-3">
                           <button className="btn btn-primary rounded-pill px-4">Connect</button>
                           <button className="btn btn-outline-primary rounded-pill px-4">Message</button>
                           <button className="btn btn-outline-secondary rounded-pill px-4">More</button>
                         </div>
                       </div>
   
                       {/* <div className="col-md-4 mt-4 mt-md-0">
                 <div className="d-flex align-items-center mb-3">
                   <img src="/netflix.png" width="28" className="me-2" />
                   <span className="fw-semibold">Netflix Inc</span>
                 </div>
                 <div className="d-flex align-items-center">
                   <img src="/stanford.png" width="28" className="me-2" />
                   <span className="fw-semibold">Stanford University</span>
                 </div>
               </div> */}
                     </div>
                   </div>
   
                 </div>
               </div>
   
               {/* About */}
   
               <div className=" my-5">
                 <div className="card shadow-sm rounded-4 p-4">
                   <h3 className="fw-bold mb-4 d-flex justify-content-between">About <span className='fw-normal '>{resData?.original?.score?.sections?.about}</span></h3>
                   {renderAboutText(
                     aboutData,
                     showFullAboutUpdated,
                     setShowFullAboutUpdated
                   )}
   
   
                 </div>
               </div>
   
               {/* ============Experience============ */}
               <div className=" my-5">
                 <div className="card shadow-sm rounded-4 p-4">
                   <h3 className="fw-bold mb-4 d-flex justify-content-between">Experience <span className='fw-normal '>{resData?.original?.score?.sections?.experience}</span></h3>
   
                   {visibleExperience.map((item, index) => (
                     <div key={index}>
                       <div className="d-flex mb-3">
                         <div className="ms-3">
                           <h6 className="fw-bold mb-0">{item.company}</h6>
                           <p className="mb-0">{item.employmentType}</p>
   
                           <small className="text-muted d-block">
                             {item.duration}
                           </small>
   
                           <small className="text-muted">
                             {item.location}
                           </small>
                         </div>
                       </div>
   
                       {index !== visibleExperience.length - 1 && <hr />}
                     </div>
                   ))}
   
                   {experienceData.length > 1 && (
                     <div className="text-center mt-2">
                       <span
                         className="text-primary"
                         style={{ cursor: "pointer", fontWeight: 500 }}
                         onClick={() => setShowAllExperience(!showAllExperience)}
                       >
                         {showAllExperience ? "See less" : "See more"}
                       </span>
                     </div>
                   )}
                 </div>
               </div>
   
               {/* ===============education section============== */}
               <div className=" my-5">
                 <div className="card shadow-sm rounded-4 p-4">
                   <h3 className="fw-bold mb-4 d-flex justify-content-between">Education<span className='fw-normal '>{resData?.original?.score?.sections?.education}</span></h3>
                   {educationData.map((item, index) => (
                     <div key={index}>
                       <div className="d-flex mb-3">
                         <div className="ms-3">
                           <h6 className="fw-bold mb-0">{item.institute}</h6>
                           <p className="mb-0">{item.degree}</p>
                           <p className="mb-0">{item.duration}</p>
                           <p className="mb-0">{item.description}</p>
                         </div>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
   
               {/* Skills Section */}
               <div className=" my-5">
                 <div className="card shadow-sm rounded-4 p-4">
                   <h3 className="fw-bold mb-4 d-flex justify-content-between">Skills<span className='fw-normal '>{resData?.original?.score?.sections?.skills}</span></h3>
                   {visibleSkills.map((skill, index) => (
                     <span
                       key={index}
                       className="pill me-2 mb-2"
                     >
                       {skill}
                     </span>
                   ))}
   
                   {skillsData.length > 5 && (
                     <div className="mt-3">
                       <span
                         className="text-primary"
                         style={{ cursor: "pointer", fontWeight: 500 }}
                         onClick={() => setShowAllSkills(!showAllSkills)}
                       >
                         {showAllSkills ? "See less" : "See more"}
                       </span>
                     </div>
                   )}
                 </div>
               </div>
             </div>
   
             {/* updated profile section ================== */}
             <div className='col-lg-6 col-12'>
   
               <div className=" my-5">
                 <div className="profile-card shadow-sm rounded-4 overflow-hidden">
   
                   {/* ===== Cover Section ===== */}
                   <div className="cover-section position-relative">
                     <div className="cover-overlay"></div>
   
                     {/* Badge */}
                     {/* <span className="designer-badge">Designer</span> */}
   
                     {/* Profile Image */}
                     <div className="profile-img-wrapper">
                       <Image
                         // src="/profile.jpg"   
                         src={profile_pic}
                         alt="Profile"
                         width={120}
                         height={120}
                         className="profile-img border"
                       />
                     </div>
   
                     {/* Headline */}
                     <div className="cover-text">
   
                     </div>
                   </div>
   
                   {/* ===== Content Section ===== */}
                   <div className="p-4 pt-5">
                     <div className="row">
                       <div className="col-md-8">
                         <h3 className="fw-bold mb-1">{resData?.original?.profile?.name}</h3>
                         <p className="text-muted mb-1 d-flex justify-content-between">{resData?.improved?.profile?.headline}<span className='fw-normal text-black fs-1'>{resData?.original?.score?.sections?.headline}</span></p>
                         <p className="text-muted">
                           {resData?.original?.profile?.location} <span className="text-primary">Contact info</span>
                         </p>
   
                         <p className="text-muted mt-2">{resData?.original?.profile?.connections}</p>
   
                         <div className="d-flex gap-2 mt-3">
                           <button className="btn btn-primary rounded-pill px-4">Connect</button>
                           <button className="btn btn-outline-primary rounded-pill px-4">Message</button>
                           <button className="btn btn-outline-secondary rounded-pill px-4">More</button>
                         </div>
                       </div>
   
                       {/* <div className="col-md-4 mt-4 mt-md-0">
                 <div className="d-flex align-items-center mb-3">
                   <img src="/netflix.png" width="28" className="me-2" />
                   <span className="fw-semibold">Netflix Inc</span>
                 </div>
                 <div className="d-flex align-items-center">
                   <img src="/stanford.png" width="28" className="me-2" />
                   <span className="fw-semibold">Stanford University</span>
                 </div>
               </div> */}
                     </div>
                   </div>
   
                 </div>
               </div>
   
               {/* About */}
   
               <div className=" my-5">
                 <div className="card shadow-sm rounded-4 p-4">
                   <h3 className="fw-bold mb-4 d-flex justify-content-between">About <span className='fw-normal '>{resData?.improved?.score?.sections?.about}</span></h3>
                   {renderAboutText(
                     aboutDataUpdated,
                     showFullAboutUpdated,
                     setShowFullAboutUpdated
                   )}
   
   
                 </div>
               </div>
   
               {/* ============Experience============ */}
               <div className=" my-5">
                 <div className="card shadow-sm rounded-4 p-4">
                   <h3 className="fw-bold mb-4 d-flex justify-content-between">Experience <span className='fw-normal '>{resData?.improved?.score?.sections?.experience}</span></h3>
   
                   {visibleExperience.map((item, index) => (
                     <div key={index}>
                       <div className="d-flex mb-3">
                         <div className="ms-3">
                           <h6 className="fw-bold mb-0">{item.company}</h6>
                           <p className="mb-0">{item.employmentType}</p>
   
                           <small className="text-muted d-block">
                             {item.duration}
                           </small>
   
                           <small className="text-muted">
                             {item.location}
                           </small>
                         </div>
                       </div>
   
                       {index !== visibleExperience.length - 1 && <hr />}
                     </div>
                   ))}
   
                   {experienceData.length > 1 && (
                     <div className="text-center mt-2">
                       <span
                         className="text-primary"
                         style={{ cursor: "pointer", fontWeight: 500 }}
                         onClick={() => setShowAllExperience(!showAllExperience)}
                       >
                         {showAllExperience ? "See less" : "See more"}
                       </span>
                     </div>
                   )}
                 </div>
               </div>
   
               {/* ===============education section============== */}
               <div className=" my-5">
                 <div className="card shadow-sm rounded-4 p-4">
                   <h3 className="fw-bold mb-4 d-flex justify-content-between">Education <span className='fw-normal '>{resData?.improved?.score?.sections?.education}</span></h3>
                   {educationData.map((item, index) => (
                     <div key={index}>
                       <div className="d-flex mb-3">
                         <div className="ms-3">
                           <h6 className="fw-bold mb-0">{item.institute}</h6>
                           <p className="mb-0">{item.degree}</p>
                           <p className="mb-0">{item.duration}</p>
                           <p className="mb-0">{item.description}</p>
                         </div>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
   
               {/* Skills Section */}
               <div className=" my-5">
                 <div className="card shadow-sm rounded-4 p-4">
                   <h3 className="fw-bold mb-4 d-flex justify-content-between">Skills<span className='fw-normal '>{resData?.improved?.score?.sections?.skills}</span></h3>
                   {Updated_visibleSkills.map((skill, index) => (
                     <span
                       key={index}
                       className="pill me-2 mb-2"
                     >
                       {skill}
                     </span>
                   ))}
   
                   {skillsDataUpdated.length > 5 && (
                     <div className="mt-3">
                       <span
                         className="text-primary"
                         style={{ cursor: "pointer", fontWeight: 500 }}
                         onClick={() => setShowAllSkills(!showAllSkills)}
                       >
                         {showAllSkills ? "See less" : "See more"}
                       </span>
                     </div>
                   )}
                 </div>
               </div>
             </div>
           </div>
   
   
   
   
   
   
   
         </div>
  </>
  );

}
