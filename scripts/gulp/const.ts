import path from 'path';

export const MDI_PACKAGE_DIR = path.resolve(__dirname, '../../node_modules/@mdi/svg');
export const MDI_META_FILE = path.resolve(MDI_PACKAGE_DIR, 'meta.json');
export const MDI_PACKAGE_JSON_FILE = path.resolve(MDI_PACKAGE_DIR, 'package.json');
export const HA_REMOVED_ICONS_URL =
	'https://raw.githubusercontent.com/home-assistant/frontend/dev/build-scripts/removedIcons.json';
export const HA_PACKAGE_JSON_URL =
	'https://raw.githubusercontent.com/home-assistant/frontend/dev/package.json';

export interface MDIIconMeta {
	id: string;
	name: string;
	codepoint: string;
	aliases: unknown[];
	tags: string[];
	author: string;
	version: string;
}

export interface HaRemovedIcon {
	path: string;
	name: string;
}

export function capitalize(s: string) {
	return s[0].toUpperCase() + s.slice(1);
}

export function kebapToCamelcase(s: string) {
	return s.replace(/-./g, (x) => x[1].toUpperCase());
}
