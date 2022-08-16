import { TaskFunction } from 'gulp';
import {
	HaRemovedIcon,
	MDIIconMeta,
	HA_PACKAGE_JSON_URL,
	HA_REMOVED_ICONS_URL,
	MDI_META_FILE,
	MDI_PACKAGE_JSON_FILE,
	MDI_PACKAGE_DIR,
	capitalize,
	kebapToCamelcase,
} from './const';
import fs from 'fs';
import path from 'path';

const OUT_FILE = path.resolve(__dirname, '../../src/generated/iconPaths.ts');

function getPathFromSVG(svg: string) {
	const matches = svg.match(/ d="([^"]+)"/);
	return matches && matches.length >= 2 ? matches[1] : undefined;
}

export const generateIconPathsTask: TaskFunction = async function (done) {
	const [mdiPackageJson, mdiIconsMeta, haPackageJson, removedIcons] = await Promise.all([
		fs.promises
			.readFile(MDI_PACKAGE_JSON_FILE, 'utf8')
			.then((f: string) => JSON.parse(f)) as Promise<Record<string, unknown>>,
		fs.promises.readFile(MDI_META_FILE, 'utf8').then((f: string) => JSON.parse(f)) as Promise<
			MDIIconMeta[]
		>,
		fetch(HA_PACKAGE_JSON_URL).then((res) => res.json()) as Promise<Record<string, unknown>>,
		fetch(HA_REMOVED_ICONS_URL).then((r) => r.json()) as Promise<HaRemovedIcon[]>,
	]);

	const mdiIcons = await Promise.all(
		mdiIconsMeta.map(async (icon) => {
			const svgFilePath = path.resolve(MDI_PACKAGE_DIR, 'svg', icon.name + '.svg');
			return await fs.promises.readFile(svgFilePath, 'utf8').then((svg) => {
				return {
					name: icon.name,
					path: getPathFromSVG(svg),
				};
			});
		})
	);

	const icons = mdiIcons
		.filter((icon) => icon.path !== undefined)
		.concat(removedIcons)
		.map((icon) => {
			return {
				...icon,
				name: `mdi${capitalize(kebapToCamelcase(icon.name))}`,
			};
		});

	const lines = [
		`// Material Design Icons v${mdiPackageJson.version}`,
		`// HomeAssistant/frontend v${haPackageJson.version}`,
	]
		.concat(icons.map((icon) => `export const ${icon.name} = '${icon.path}';`))
		.concat([''])
		.join('\n');

	await fs.promises.writeFile(OUT_FILE, lines);

	done();
};
