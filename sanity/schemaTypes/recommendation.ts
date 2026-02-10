import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'recommendation',
    title: 'Recommendation',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'position',
            title: 'Position',
            type: 'string',
            description: 'e.g., CTO, Engineering Manager',
        }),
        defineField({
            name: 'company',
            title: 'Company',
            type: 'string',
        }),
        defineField({
            name: 'quote',
            title: 'Recommendation Quote',
            type: 'text',
            rows: 4,
        }),
        defineField({
            name: 'linkedin',
            title: 'LinkedIn URL',
            type: 'url',
        }),
        defineField({
            name: 'email',
            title: 'Email (Optional)',
            type: 'string',
            description: 'If you want to display email for verification (rare on public CVs but possible).',
        }),
        defineField({
            name: 'photo',
            title: 'Photo',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
    ],
})
