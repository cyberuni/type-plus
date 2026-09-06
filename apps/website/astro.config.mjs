// @ts-check
import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'
import ecTwoSlash from 'expressive-code-twoslash'

// https://astro.build/config
export default defineConfig({
	site: 'https://cyberuni.github.io',
	base: '/type-plus',
	integrations: [
		starlight({
			// Code blocks tagged ```ts twoslash are compiled by the real TypeScript
			// compiler, so hovers show the types this library actually produces
			// rather than a comment claiming what it produces. For a type-level
			// library that is the difference between documentation and assertion.
			expressiveCode: {
				plugins: [ecTwoSlash()],
			},
			title: 'type-plus',
			logo: {
				light: './src/assets/type-plus.svg',
				dark: './src/assets/type-plus.svg',
			},
			description:
				'Provides over 200 utility types and functions for applications, library, and type-level programming.',
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/cyberuni/type-plus',
				},
			],
			editLink: {
				baseUrl: 'https://github.com/cyberuni/type-plus/edit/main/apps/website/',
			},
			sidebar: [
				{
					label: 'Guides',
					items: [
						{ label: 'Getting Started', link: '/guides/getting-started/' },
						{
							label: 'TypeScript Version Compatibility',
							link: '/guides/typescript-version-compatibility/',
						},
						{
							label: 'Migrating from Then/Else to $Options',
							link: '/guides/migrating-then-else-to-options/',
						},
					],
				},
				{
					label: 'API',
					items: [{ autogenerate: { directory: 'api' } }],
				},
				{
					label: 'Reference',
					items: [{ autogenerate: { directory: 'reference' } }],
				},
			],
		}),
	],
})
