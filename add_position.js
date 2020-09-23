const Position = require('./models/PositionModel.js');
const database = require('./models/db.js');
const { ObjectID } = require('mongodb');

database.connect();

var position = [
    {
        dept_name: "Department of Administrative Affairs",
        position_name: "Secretary",
        position_available: true,
    },

    {
        dept_name: "Department of Administrative Affairs",
        position_name: "HR Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Administrative Affairs",
        position_name: "Internal Policy Director",
        position_available: true,
    },

    {
        dept_name: "Department of Administrative Affairs",
        position_name: "External Policy Director",
        position_available: true,
    },

    {
        dept_name: "Department of Administrative Affairs",
        position_name: "Legal Affiliation Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Administrative Affairs",
        position_name: "External Relations Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Administrative Affairs",
        position_name: "Finance Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Administrative Affairs",
        position_name: "Logistics Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Administrative Affairs",
        position_name: "Creative/Multimedia Artist",
        position_available: true,
    },

    {
        dept_name: "Department of Administrative Affairs",
        position_name: "Photographer/Videographer/Documentation Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Administrative Affairs",
        position_name: "Content Writer",
        position_available: true,
    },

    {
        dept_name: "Department of Administrative Affairs",
        position_name: "Research Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Administrative Affairs",
        position_name: "Social Media Curator",
        position_available: true,
    },

    {
        dept_name: "Department of Administrative Affairs",
        position_name: "Social Media Engagement Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Publications and Communications",
        position_name: "Secretary",
        position_available: true,
    },

    {
        dept_name: "Department of Publications and Communications",
        position_name: "HR Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Publications and Communications",
        position_name: "Internal Policy Director",
        position_available: true,
    },

    {
        dept_name: "Department of Publications and Communications",
        position_name: "External Policy Director",
        position_available: true,
    },

    {
        dept_name: "Department of Publications and Communications",
        position_name: "Legal Affiliation Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Publications and Communications",
        position_name: "External Relations Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Publications and Communications",
        position_name: "Finance Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Publications and Communications",
        position_name: "Logistics Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Publications and Communications",
        position_name: "Creative/Multimedia Artist",
        position_available: true,
    },

    {
        dept_name: "Department of Publications and Communications",
        position_name: "Photographer/Videographer/Documentation Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Publications and Communications",
        position_name: "Content Writer",
        position_available: true,
    },

    {
        dept_name: "Department of Publications and Communications",
        position_name: "Research Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Publications and Communications",
        position_name: "Social Media Curator",
        position_available: true,
    },

    {
        dept_name: "Department of Publications and Communications",
        position_name: "Social Media Engagement Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Marketing, Finance and Logistics",
        position_name: "Secretary",
        position_available: true,
    },

    {
        dept_name: "Department of Marketing, Finance and Logistics",
        position_name: "HR Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Marketing, Finance and Logistics",
        position_name: "Internal Policy Director",
        position_available: true,
    },

    {
        dept_name: "Department of Marketing, Finance and Logistics",
        position_name: "External Policy Director",
        position_available: true,
    },

    {
        dept_name: "Department of Marketing, Finance and Logistics",
        position_name: "Legal Affiliation Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Marketing, Finance and Logistics",
        position_name: "External Relations Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Marketing, Finance and Logistics",
        position_name: "Finance Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Marketing, Finance and Logistics",
        position_name: "Logistics Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Marketing, Finance and Logistics",
        position_name: "Creative/Multimedia Artist",
        position_available: true,
    },

    {
        dept_name: "Department of Marketing, Finance and Logistics",
        position_name: "Photographer/Videographer/Documentation Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Marketing, Finance and Logistics",
        position_name: "Content Writer",
        position_available: true,
    },

    {
        dept_name: "Department of Marketing, Finance and Logistics",
        position_name: "Research Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Marketing, Finance and Logistics",
        position_name: "Social Media Curator",
        position_available: true,
    },

    {
        dept_name: "Department of Marketing, Finance and Logistics",
        position_name: "Social Media Engagement Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Disaster Mitigation and Recovery",
        position_name: "Secretary",
        position_available: true,
    },

    {
        dept_name: "Department of Disaster Mitigation and Recovery",
        position_name: "HR Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Disaster Mitigation and Recovery",
        position_name: "Internal Policy Director",
        position_available: true,
    },

    {
        dept_name: "Department of Disaster Mitigation and Recovery",
        position_name: "External Policy Director",
        position_available: true,
    },

    {
        dept_name: "Department of Disaster Mitigation and Recovery",
        position_name: "Legal Affiliation Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Disaster Mitigation and Recovery",
        position_name: "External Relations Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Disaster Mitigation and Recovery",
        position_name: "Finance Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Disaster Mitigation and Recovery",
        position_name: "Logistics Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Disaster Mitigation and Recovery",
        position_name: "Creative/Multimedia Artist",
        position_available: true,
    },

    {
        dept_name: "Department of Disaster Mitigation and Recovery",
        position_name: "Photographer/Videographer/Documentation Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Disaster Mitigation and Recovery",
        position_name: "Content Writer",
        position_available: true,
    },

    {
        dept_name: "Department of Disaster Mitigation and Recovery",
        position_name: "Research Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Disaster Mitigation and Recovery",
        position_name: "Social Media Curator",
        position_available: true,
    },

    {
        dept_name: "Department of Disaster Mitigation and Recovery",
        position_name: "Social Media Engagement Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Animal and Environmental Welfare",
        position_name: "Secretary",
        position_available: true,
    },

    {
        dept_name: "Department of Animal and Environmental Welfare",
        position_name: "HR Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Animal and Environmental Welfare",
        position_name: "Internal Policy Director",
        position_available: true,
    },

    {
        dept_name: "Department of Animal and Environmental Welfare",
        position_name: "External Policy Director",
        position_available: true,
    },

    {
        dept_name: "Department of Animal and Environmental Welfare",
        position_name: "Legal Affiliation Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Animal and Environmental Welfare",
        position_name: "External Relations Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Animal and Environmental Welfare",
        position_name: "Finance Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Animal and Environmental Welfare",
        position_name: "Logistics Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Animal and Environmental Welfare",
        position_name: "Creative/Multimedia Artist",
        position_available: true,
    },

    {
        dept_name: "Department of Animal and Environmental Welfare",
        position_name: "Photographer/Videographer/Documentation Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Animal and Environmental Welfare",
        position_name: "Content Writer",
        position_available: true,
    },

    {
        dept_name: "Department of Animal and Environmental Welfare",
        position_name: "Research Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Animal and Environmental Welfare",
        position_name: "Social Media Curator",
        position_available: true,
    },

    {
        dept_name: "Department of Animal and Environmental Welfare",
        position_name: "Social Media Engagement Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Marginalized Community Action",
        position_name: "Secretary",
        position_available: true,
    },

    {
        dept_name: "Department of Marginalized Community Action",
        position_name: "HR Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Marginalized Community Action",
        position_name: "Internal Policy Director",
        position_available: true,
    },

    {
        dept_name: "Department of Marginalized Community Action",
        position_name: "External Policy Director",
        position_available: true,
    },

    {
        dept_name: "Department of Marginalized Community Action",
        position_name: "Legal Affiliation Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Marginalized Community Action",
        position_name: "External Relations Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Marginalized Community Action",
        position_name: "Finance Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Marginalized Community Action",
        position_name: "Logistics Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Marginalized Community Action",
        position_name: "Creative/Multimedia Artist",
        position_available: true,
    },

    {
        dept_name: "Department of Marginalized Community Action",
        position_name: "Photographer/Videographer/Documentation Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Marginalized Community Action",
        position_name: "Content Writer",
        position_available: true,
    },

    {
        dept_name: "Department of Marginalized Community Action",
        position_name: "Research Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Marginalized Community Action",
        position_name: "Social Media Curator",
        position_available: true,
    },

    {
        dept_name: "Department of Marginalized Community Action",
        position_name: "Social Media Engagement Officer",
        position_available: true,
    },

    {
        dept_name: "Department of SOGIE Rights",
        position_name: "Secretary",
        position_available: true,
    },

    {
        dept_name: "Department of SOGIE Rights",
        position_name: "HR Officer",
        position_available: true,
    },

    {
        dept_name: "Department of SOGIE Rights",
        position_name: "Internal Policy Director",
        position_available: true,
    },

    {
        dept_name: "Department of SOGIE Rights",
        position_name: "External Policy Director",
        position_available: true,
    },

    {
        dept_name: "Department of SOGIE Rights",
        position_name: "Legal Affiliation Officer",
        position_available: true,
    },

    {
        dept_name: "Department of SOGIE Rights",
        position_name: "External Relations Officer",
        position_available: true,
    },

    {
        dept_name: "Department of SOGIE Rights",
        position_name: "Finance Officer",
        position_available: true,
    },

    {
        dept_name: "Department of SOGIE Rights",
        position_name: "Logistics Officer",
        position_available: true,
    },

    {
        dept_name: "Department of SOGIE Rights",
        position_name: "Creative/Multimedia Artist",
        position_available: true,
    },

    {
        dept_name: "Department of SOGIE Rights",
        position_name: "Photographer/Videographer/Documentation Officer",
        position_available: true,
    },

    {
        dept_name: "Department of SOGIE Rights",
        position_name: "Content Writer",
        position_available: true,
    },

    {
        dept_name: "Department of SOGIE Rights",
        position_name: "Research Officer",
        position_available: true,
    },

    {
        dept_name: "Department of SOGIE Rights",
        position_name: "Social Media Curator",
        position_available: true,
    },

    {
        dept_name: "Department of SOGIE Rights",
        position_name: "Social Media Engagement Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Mental Health",
        position_name: "Secretary",
        position_available: true,
    },

    {
        dept_name: "Department of Mental Health",
        position_name: "HR Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Mental Health",
        position_name: "Internal Policy Director",
        position_available: true,
    },

    {
        dept_name: "Department of Mental Health",
        position_name: "External Policy Director",
        position_available: true,
    },

    {
        dept_name: "Department of Mental Health",
        position_name: "Legal Affiliation Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Mental Health",
        position_name: "External Relations Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Mental Health",
        position_name: "Finance Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Mental Health",
        position_name: "Logistics Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Mental Health",
        position_name: "Creative/Multimedia Artist",
        position_available: true,
    },

    {
        dept_name: "Department of Mental Health",
        position_name: "Photographer/Videographer/Documentation Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Mental Health",
        position_name: "Content Writer",
        position_available: true,
    },

    {
        dept_name: "Department of Mental Health",
        position_name: "Research Officer",
        position_available: true,
    },

    {
        dept_name: "Department of Mental Health",
        position_name: "Social Media Curator",
        position_available: true,
    },

    {
        dept_name: "Department of Mental Health",
        position_name: "Social Media Engagement Officer",
        position_available: true,
    },

    {
        dept_name: "Project Taft",
        position_name: "Secretary",
        position_available: true,
    },

    {
        dept_name: "Project Taft",
        position_name: "HR Officer",
        position_available: true,
    },

    {
        dept_name: "Project Taft",
        position_name: "Internal Policy Director",
        position_available: true,
    },

    {
        dept_name: "Project Taft",
        position_name: "External Policy Director",
        position_available: true,
    },

    {
        dept_name: "Project Taft",
        position_name: "Legal Affiliation Officer",
        position_available: true,
    },

    {
        dept_name: "Project Taft",
        position_name: "External Relations Officer",
        position_available: true,
    },

    {
        dept_name: "Project Taft",
        position_name: "Finance Officer",
        position_available: true,
    },

    {
        dept_name: "Project Taft",
        position_name: "Logistics Officer",
        position_available: true,
    },

    {
        dept_name: "Project Taft",
        position_name: "Creative/Multimedia Artist",
        position_available: true,
    },

    {
        dept_name: "Project Taft",
        position_name: "Photographer/Videographer/Documentation Officer",
        position_available: true,
    },

    {
        dept_name: "Project Taft",
        position_name: "Content Writer",
        position_available: true,
    },

    {
        dept_name: "Project Taft",
        position_name: "Research Officer",
        position_available: true,
    },

    {
        dept_name: "Project Taft",
        position_name: "Social Media Curator",
        position_available: true,
    },

    {
        dept_name: "Project Taft",
        position_name: "Social Media Engagement Officer",
        position_available: true,
    },

    {
        dept_name: "Project España",
        position_name: "Secretary",
        position_available: true,
    },

    {
        dept_name: "Project España",
        position_name: "HR Officer",
        position_available: true,
    },

    {
        dept_name: "Project España",
        position_name: "Internal Policy Director",
        position_available: true,
    },

    {
        dept_name: "Project España",
        position_name: "External Policy Director",
        position_available: true,
    },

    {
        dept_name: "Project España",
        position_name: "Legal Affiliation Officer",
        position_available: true,
    },

    {
        dept_name: "Project España",
        position_name: "External Relations Officer",
        position_available: true,
    },

    {
        dept_name: "Project España",
        position_name: "Finance Officer",
        position_available: true,
    },

    {
        dept_name: "Project España",
        position_name: "Logistics Officer",
        position_available: true,
    },

    {
        dept_name: "Project España",
        position_name: "Creative/Multimedia Artist",
        position_available: true,
    },

    {
        dept_name: "Project España",
        position_name: "Photographer/Videographer/Documentation Officer",
        position_available: true,
    },

    {
        dept_name: "Project España",
        position_name: "Content Writer",
        position_available: true,
    },

    {
        dept_name: "Project España",
        position_name: "Research Officer",
        position_available: true,
    },

    {
        dept_name: "Project España",
        position_name: "Social Media Curator",
        position_available: true,
    },

    {
        dept_name: "Project España",
        position_name: "Social Media Engagement Officer",
        position_available: true,
    },

    {
        dept_name: "Project Katipunan",
        position_name: "Secretary",
        position_available: true,
    },

    {
        dept_name: "Project Katipunan",
        position_name: "HR Officer",
        position_available: true,
    },

    {
        dept_name: "Project Katipunan",
        position_name: "Internal Policy Director",
        position_available: true,
    },

    {
        dept_name: "Project Katipunan",
        position_name: "External Policy Director",
        position_available: true,
    },

    {
        dept_name: "Project Katipunan",
        position_name: "Legal Affiliation Officer",
        position_available: true,
    },

    {
        dept_name: "Project Katipunan",
        position_name: "External Relations Officer",
        position_available: true,
    },

    {
        dept_name: "Project Katipunan",
        position_name: "Finance Officer",
        position_available: true,
    },

    {
        dept_name: "Project Katipunan",
        position_name: "Logistics Officer",
        position_available: true,
    },

    {
        dept_name: "Project Katipunan",
        position_name: "Creative/Multimedia Artist",
        position_available: true,
    },

    {
        dept_name: "Project Katipunan",
        position_name: "Photographer/Videographer/Documentation Officer",
        position_available: true,
    },

    {
        dept_name: "Project Katipunan",
        position_name: "Content Writer",
        position_available: true,
    },

    {
        dept_name: "Project Katipunan",
        position_name: "Research Officer",
        position_available: true,
    },

    {
        dept_name: "Project Katipunan",
        position_name: "Social Media Curator",
        position_available: true,
    },

    {
        dept_name: "Project Katipunan",
        position_name: "Social Media Engagement Officer",
        position_available: true,
    },
];

database.insertMany(Position, position);