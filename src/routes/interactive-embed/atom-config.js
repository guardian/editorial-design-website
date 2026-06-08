export const ATOM_CONFIG__ATOMS = [
	{ id: 'culture-lists', name: 'Culture Lists' },
	{ id: 'snap-slides', name: 'Snap Slides' }
];

const ATOM_CONFIG__PROPS = {
	'culture-lists': [
		{
			name: 'isEoY',
			type: 'checkbox',
			value: false,
			description: 'Tick box to enable End of Year styling'
		},
		{
			name: 'isBestPaperbacks',
			type: 'checkbox',
			value: false,
			description: 'Tick box to enable Best Paperbacks styling'
		},
		{
			name: 'renderNavBar',
			type: 'checkbox',
			value: true,
			description: 'Tick box to render the navigation bar'
		},
		{
			name: 'animationsOn',
			type: 'checkbox',
			value: true,
			description: 'Tick box to enable animations (works well only with short sections)'
		}
	]
};

const ATOM__URLS = {
	'culture-lists':
		'https://content.guardianapis.com/atom/interactive/interactives/2025/08/2025-list-template/default-list'
};

export const getAtomProps = (atomType) => {
	const props = ATOM_CONFIG__PROPS[atomType] || [];
	return props;
};

export const getAtomUrl = (atomType) => {
	return ATOM__URLS[atomType] || undefined;
};
