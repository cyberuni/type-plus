import type { KnipConfig } from 'knip'

const config: KnipConfig = {
	workspaces: {
		'.': {
			entry: ['package.json'],
			project: ['**/*.{ts,tsx,js,jsx,mjs,cjs}'],
			ignore: [
				'**/*.{spec,test,unit,accept,integrate,system,perf,stress}.*',
				'**/node_modules/**',
				'**/dist/**',
				'**/build/**',
				'**/cjs/**',
				'**/esm/**',
				'**/lib/**',
				'**/coverage/**',
				'**/.turbo/**',
				'**/slides/**',
			],
		},
		'packages/*': {
			entry: ['src/index.{ts,tsx,js,jsx}', 'package.json'],
			project: ['src/**/*.{ts,tsx,js,jsx,mjs,cjs}'],
			ignore: [
				'**/*.{spec,test,unit,accept,integrate,system,perf,stress}.*',
				'**/node_modules/**',
				'**/dist/**',
				'**/build/**',
				'**/cjs/**',
				'**/esm/**',
				'**/lib/**',
				'**/coverage/**',
			],
		},
		'apps/*': {
			entry: ['src/**/*.{ts,tsx,js,jsx,mjs,cjs}', 'package.json'],
			project: ['src/**/*.{ts,tsx,js,jsx,mjs,cjs}'],
			ignore: [
				'**/*.{spec,test,unit,accept,integrate,system,perf,stress}.*',
				'**/node_modules/**',
				'**/dist/**',
				'**/build/**',
				'**/.next/**',
				'**/coverage/**',
			],
		},
	},
	ignore: [
		'**/*.d.ts',
		'**/jest.config.*',
		'**/tsconfig*.json',
		'**/turbo.json',
		'**/pnpm-workspace.yaml',
		'**/biome.json',
		'**/eslint.config.*',
		'**/commitlint.config.*',
	],
}

export default config
