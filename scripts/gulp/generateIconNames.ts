import path from 'path';
import fs from 'fs';
import type { TaskFunction } from 'gulp';
import {
	HaRemovedIcon,
	MDIIconMeta,
	capitalize,
	HA_PACKAGE_JSON_URL,
	HA_REMOVED_ICONS_URL,
	kebapToCamelcase,
	MDI_META_FILE,
	MDI_PACKAGE_JSON_FILE,
} from './const';

const OUT_FILE = path.resolve(__dirname, '../../src/generated/iconNames.ts');

export const generateIconNamesTask: TaskFunction = async function (done) {
	const [mdiPackageJson, mdiIconsMeta, haPackageJson, haRemovedIcons] = await Promise.all([
		fs.promises
			.readFile(MDI_PACKAGE_JSON_FILE, 'utf8')
			.then((f: string) => JSON.parse(f)) as Promise<Record<string, unknown>>,
		fs.promises.readFile(MDI_META_FILE, 'utf8').then((f: string) => JSON.parse(f)) as Promise<
			MDIIconMeta[]
		>,
		fetch(HA_PACKAGE_JSON_URL).then((res) => res.json()) as Promise<Record<string, unknown>>,
		fetch(HA_REMOVED_ICONS_URL).then((r) => r.json()) as Promise<HaRemovedIcon[]>,
	]);

	const iconNames = mdiIconsMeta
		.map((icon) => icon.name)
		.concat(haRemovedIcons.map((icon) => icon.name))
		.map((name) => {
			return { name: `mdi${capitalize(kebapToCamelcase(name))}`, id: `mdi:${name}` };
		});

	const lines = [
		`// Material Design Icons v${mdiPackageJson.version}`,
		`// HomeAssistant/frontend v${haPackageJson.version}`,
	]
		.concat(iconNames.map((icon) => `export const ${icon.name} = '${icon.id}';`))
		.concat([''])
		.join('\n');

	const parentDir = path.dirname(OUT_FILE);
	if (!fs.existsSync(parentDir)) {
		fs.mkdirSync(parentDir);
	}

	fs.writeFileSync(OUT_FILE, lines);

	done();
};
