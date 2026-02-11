import { defineField, defineType, defineArrayMember } from 'sanity'

export default defineType({
    name: 'resume',
    title: 'Resume',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Resume Title',
            type: 'string',
            description: 'e.g., "Full Stack Developer Resume", "QA Specialist Resume"',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'professionalSummary',
            title: 'Professional Summary',
            type: 'text',
            description: 'A tailored summary for this specific resume version. If left empty, the site-wide tagline/about might be used.',
            rows: 4,
        }),
        defineField({
            name: 'coreCompetencies',
            title: 'Core Competencies',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'List of key expertise areas (e.g., Test Automation, CI/CD, Performance Testing).',
            options: {
                layout: 'tags'
            }
        }),
        defineField({
            name: 'contactInfo',
            title: 'Contact Information Override',
            type: 'object',
            fields: [
                defineField({ name: 'email', title: 'Email', type: 'string' }),
                defineField({ name: 'phone', title: 'Phone', type: 'string' }),
                defineField({ name: 'location', title: 'Location', type: 'string' }),
                defineField({ name: 'website', title: 'Website URL', type: 'url' }),
                defineField({ name: 'linkedin', title: 'LinkedIn URL', type: 'url' }),
                defineField({ name: 'github', title: 'GitHub URL', type: 'url' }),
            ],
            options: {
                collapsible: true,
                collapsed: true,
            }
        }),
        defineField({
            name: 'education',
            title: 'Education',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'education' } }],
            description: 'Select specific education entries to show.',
        }),
        defineField({
            name: 'experience',
            title: 'Work Experience',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'experience' } }],
            description: 'Select specific work experiences to show.',
        }),
        defineField({
            name: 'skills',
            title: 'Skills',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'skillCategory' } }],
            description: 'Select skill categories to show.',
        }),
        defineField({
            name: 'certifications',
            title: 'Certifications',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'certification' } }],
            description: 'Select certifications to show.',
        }),
        defineField({
            name: 'references',
            title: 'References / Recommendations',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'recommendation' } }],
            description: 'Select recommendations to show at the bottom of the resume.',
        }),
        defineField({
            name: 'resumeProjects',
            title: 'Resume Projects',
            type: 'array',
            description: 'Projects specific to the resume (points, links) - separate from main portfolio.',
            of: [
                defineArrayMember({
                    type: 'object',
                    fields: [
                        { name: 'title', title: 'Project Title', type: 'string', validation: (Rule) => Rule.required() },
                        { name: 'link', title: 'Project Link', type: 'url' },
                        { name: 'date', title: 'Date / Period', type: 'string', initialValue: '2024' },
                        {
                            name: 'techStack',
                            title: 'Tech Stack',
                            type: 'array',
                            of: [{ type: 'string' }],
                            options: { layout: 'tags' }
                        },
                        {
                            name: 'summary',
                            title: 'Bullet Points (Summary)',
                            type: 'array',
                            of: [{ type: 'string' }]
                        }
                    ]
                })
            ]
        }),
    ],
})
