// File: /api/audit/scrape.js (Backend endpoint)
// Place this in your backend at: http://localhost:3000/api/audit/scrape

const express = require('express');
const router = express.Router();

// POST /api/audit/scrape
router.post('/scrape', async (req, res) => {
  console.log('📥 Received LinkedIn data from extension');
  
  try {
    const {
      username,
      profile_picture,
      headline,
      about,
      location,
      connections,
      experience,
      education,
      skills,
      activity,
      contact,
      role,
      requestId,
      profileType,
      profileUrl
    } = req.body;
    
    console.log('👤 User data:', {
      username,
      role,
      profileType,
      experienceCount: experience?.length || 0,
      skillsCount: skills?.length || 0
    });
    
    // Calculate scores based on the data
    const scores = calculateScores(req.body);
    
    // Generate recommendations
    const recommendations = generateRecommendations(req.body, scores);
    
    // Prepare response
    const response = {
      success: true,
      requestId,
      timestamp: new Date().toISOString(),
      profile: {
        username,
        profileType,
        role,
        url: profileUrl
      },
      score: scores,
      recommendations,
      details: {
        profileCompleteness: analyzeProfileCompleteness(req.body),
        keywordAnalysis: analyzeKeywords(headline, about, role),
        experienceAnalysis: analyzeExperience(experience),
        networkAnalysis: analyzeNetwork(connections),
        contentAnalysis: analyzeActivity(activity)
      }
    };
    
    console.log('✅ Audit completed, sending response');
    res.json(response);
    
  } catch (error) {
    console.error('❌ Error processing audit:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      requestId: req.body?.requestId,
      timestamp: new Date().toISOString()
    });
  }
});

// Helper functions for scoring
function calculateScores(data) {
  let overall = 0;
  let profileCompleteness = 0;
  let keywordOptimization = 0;
  let engagement = 0;
  let network = 0;
  let content = 0;
  
  // Calculate profile completeness (0-100)
  const completenessFactors = [];
  if (data.username) completenessFactors.push(15);
  if (data.profile_picture) completenessFactors.push(15);
  if (data.headline && data.headline.length > 10) completenessFactors.push(15);
  if (data.about && data.about.length > 50) completenessFactors.push(15);
  if (data.location) completenessFactors.push(10);
  if (data.experience && data.experience.length > 0) completenessFactors.push(15);
  if (data.education && data.education.length > 0) completenessFactors.push(10);
  if (data.skills && data.skills.length > 5) completenessFactors.push(5);
  
  profileCompleteness = completenessFactors.reduce((a, b) => a + b, 0);
  
  // Calculate keyword optimization (0-100)
  const headlineWords = (data.headline || '').split(/\s+/).length;
  const aboutWords = (data.about || '').split(/\s+/).length;
  keywordOptimization = Math.min(100, Math.floor((headlineWords + aboutWords) / 3));
  
  // Calculate network score based on connections
  const connectionsNum = parseInt((data.connections || '0').replace(/,/g, '')) || 0;
  network = Math.min(100, Math.floor(connectionsNum / 10));
  
  // Calculate content score based on activity
  content = data.activity ? Math.min(100, data.activity.length * 20) : 30;
  
  // Calculate engagement score (simulated)
  engagement = Math.min(100, Math.floor((profileCompleteness + network + content) / 3));
  
  // Calculate overall score
  overall = Math.floor((profileCompleteness * 0.3) + 
                      (keywordOptimization * 0.2) + 
                      (engagement * 0.15) + 
                      (network * 0.2) + 
                      (content * 0.15));
  
  return {
    overall,
    profileCompleteness,
    keywordOptimization,
    engagement,
    network,
    content
  };
}

function generateRecommendations(data, scores) {
  const recommendations = [];
  
  if (scores.profileCompleteness < 70) {
    recommendations.push("Complete your profile by adding missing sections");
  }
  
  if (!data.profile_picture) {
    recommendations.push("Add a professional profile picture");
  }
  
  if (!data.headline || data.headline.length < 20) {
    recommendations.push("Expand your headline to include keywords and your value proposition");
  }
  
  if (!data.about || data.about.length < 100) {
    recommendations.push("Write a detailed about section summarizing your experience and goals");
  }
  
  if (!data.experience || data.experience.length === 0) {
    recommendations.push("Add your work experience with detailed descriptions");
  } else if (data.experience.length < 2) {
    recommendations.push("Add more work experiences with detailed accomplishments");
  }
  
  if (!data.skills || data.skills.length < 5) {
    recommendations.push("Add at least 10 relevant skills to your profile");
  }
  
  if (scores.network < 50) {
    recommendations.push("Grow your network by connecting with colleagues and industry professionals");
  }
  
  if (scores.content < 40) {
    recommendations.push("Increase your engagement by posting relevant content and commenting");
  }
  
  // Role-specific recommendations
  if (data.role === 'job_seeker') {
    recommendations.push("Highlight achievements with metrics and results in experience section");
    recommendations.push("Request recommendations from colleagues and managers");
  }
  
  if (data.role === 'founder' || data.role === 'owner_ceo') {
    recommendations.push("Showcase company achievements and milestones");
    recommendations.push("Share thought leadership content regularly");
  }
  
  return recommendations.slice(0, 8); // Return top 8 recommendations
}

function analyzeProfileCompleteness(data) {
  const analysis = {
    hasProfilePicture: !!data.profile_picture,
    hasHeadline: !!(data.headline && data.headline.trim()),
    hasAbout: !!(data.about && data.about.length > 50),
    hasLocation: !!data.location,
    experienceCount: data.experience?.length || 0,
    educationCount: data.education?.length || 0,
    skillsCount: data.skills?.length || 0,
    hasConnections: !!(data.connections && data.connections !== '0')
  };
  
  analysis.missingItems = Object.entries(analysis)
    .filter(([key, value]) => !value && key !== 'experienceCount' && key !== 'educationCount' && key !== 'skillsCount')
    .map(([key]) => key.replace('has', '').replace(/([A-Z])/g, ' $1').trim());
    
  analysis.completenessPercentage = Math.floor(
    (Object.values(analysis).filter(Boolean).length / 
     Object.keys(analysis).filter(k => k.startsWith('has')).length) * 100
  );
  
  return analysis;
}

function analyzeKeywords(headline, about, role) {
  const commonKeywords = {
    job_seeker: ['experienced', 'skilled', 'proven', 'results', 'achieved', 'led', 'managed'],
    founder: ['entrepreneur', 'founder', 'startup', 'vision', 'leadership', 'strategy', 'growth'],
    marketer: ['marketing', 'strategy', 'campaign', 'growth', 'digital', 'content', 'social media'],
    sales_operations: ['sales', 'revenue', 'growth', 'operations', 'efficiency', 'process', 'strategy']
  };
  
  const roleKeywords = commonKeywords[role] || commonKeywords.job_seeker;
  const text = (headline || '') + ' ' + (about || '');
  const foundKeywords = roleKeywords.filter(keyword => 
    text.toLowerCase().includes(keyword.toLowerCase())
  );
  
  return {
    totalKeywords: roleKeywords.length,
    foundKeywords: foundKeywords.length,
    foundKeywordsList: foundKeywords,
    coverage: Math.floor((foundKeywords.length / roleKeywords.length) * 100)
  };
}

function analyzeExperience(experience) {
  if (!experience || experience.length === 0) {
    return { count: 0, hasDescriptions: false, avgDescriptionLength: 0 };
  }
  
  const hasDescriptions = experience.some(exp => exp.description && exp.description.length > 10);
  const totalDescriptionLength = experience.reduce((sum, exp) => 
    sum + (exp.description?.length || 0), 0);
  const avgDescriptionLength = Math.floor(totalDescriptionLength / experience.length);
  
  return {
    count: experience.length,
    hasDescriptions,
    avgDescriptionLength,
    quality: hasDescriptions && avgDescriptionLength > 50 ? 'good' : 'needs improvement'
  };
}

function analyzeNetwork(connections) {
  const connectionsNum = parseInt((connections || '0').replace(/,/g, '')) || 0;
  
  let strength = 'weak';
  if (connectionsNum > 500) strength = 'excellent';
  else if (connectionsNum > 200) strength = 'good';
  else if (connectionsNum > 50) strength = 'average';
  
  return {
    connections: connectionsNum,
    strength,
    recommendation: connectionsNum < 200 ? 'Consider growing your network' : 'Strong network'
  };
}

function analyzeActivity(activity) {
  if (!activity || activity.length === 0) {
    return { recentActivity: false, count: 0, engagement: 'low' };
  }
  
  const recentCount = activity.length;
  let engagement = 'low';
  if (recentCount > 5) engagement = 'high';
  else if (recentCount > 2) engagement = 'medium';
  
  return {
    recentActivity: true,
    count: recentCount,
    engagement,
    recommendation: recentCount < 3 ? 'Increase posting frequency' : 'Good engagement'
  };
}

module.exports = router;