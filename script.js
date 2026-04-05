const internships = [
    {
        id: 1,
        title: 'Frontend Web Developer Intern',
        company: 'TechForge',
        requiredSkills: ['javascript', 'html', 'css', 'react'],
        minCgpa: 7.0,
        description: 'Build UI components and improve user experience.'
    },
    {
        id: 2,
        title: 'Data Science Intern',
        company: 'InsightLabs',
        requiredSkills: ['python', 'pandas', 'numpy', 'machine learning'],
        minCgpa: 7.5,
        description: 'Analyze data and build predictive models.'
    },
    {
        id: 3,
        title: 'Backend Developer Intern',
        company: 'CloudWorks',
        requiredSkills: ['nodejs', 'express', 'mongodb', 'api'],
        minCgpa: 6.5,
        description: 'Develop and maintain backend services.'
    },
    {
        id: 4,
        title: 'AI Research Intern',
        company: 'NeuroByte',
        requiredSkills: ['python', 'tensorflow', 'deep learning', 'nlp'],
        minCgpa: 8.0,
        description: 'Work on AI models and research prototypes.'
    },
    {
        id: 5,
        title: 'Mobile App Intern',
        company: 'AppVista',
        requiredSkills: ['flutter', 'dart', 'ui design'],
        minCgpa: 6.8,
        description: 'Create mobile applications for Android and iOS.'
    }
];

function normalizeSkills(skills) {
    return Array.isArray(skills)
        ? skills.map(skill => skill.toString().trim().toLowerCase())
        : [];
}

function calculateScore(internship, userSkills, userCgpa) {
    const required = normalizeSkills(internship.requiredSkills);
    const matchedSkills = required.filter(skill => userSkills.includes(skill)).length;
    const skillScore = matchedSkills / Math.max(required.length, 1);
    const cgpaBonus = userCgpa >= internship.minCgpa ? 1 : userCgpa / internship.minCgpa;
    return skillScore * 0.7 + cgpaBonus * 0.3;
}

function recommendInternships(skills, cgpa, topN = 3) {
    const userSkills = normalizeSkills(skills);
    const userCgpa = Number(cgpa) || 0;

    return internships
        .map(internship => ({
            ...internship,
            score: calculateScore(internship, userSkills, userCgpa)
        }))
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, topN);
}

// Example usage:
const userSkills = ['JavaScript', 'React', 'HTML', 'CSS'];
const userCgpa = 7.8;
const recommendations = recommendInternships(userSkills, userCgpa, 4);
console.log(recommendations);