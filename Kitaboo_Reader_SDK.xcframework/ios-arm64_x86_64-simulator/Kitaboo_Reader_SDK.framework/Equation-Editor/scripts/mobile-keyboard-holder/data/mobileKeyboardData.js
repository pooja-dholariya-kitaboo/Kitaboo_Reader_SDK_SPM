var mobileKeyboardData = {
	math: {
		first: [{
				id: 1,
				displayText: '<span class="icon-x-upon-y fontFile"></span>',
				latex: ['\\frac ', 'key-Backspace']
			},
			{
				id: 2,
				displayText: '√x',
				latex: ['\\sqrt ', 'key-Backspace']
			},
			{
				id: 3,
				displayText: '<span>&#8319;</span>√',
				latex: ['x', '^', 'key-Left', 'key-Backspace', 'key-Right', 'key-Right', '\\sqrt ', 'key-Backspace', 'key-Left', 'key-Left'],
			},
			{
				id: 4,
				displayText: 'x<sup>y</sup>',
				latex: ['^', 'key-Left']
			},
			{
				id: 5,
				displayText: '|x|',
				latex: ['|'],
				spec: true
			},
			{
				id: 6,
				displayText: 'x',
				latex: ['x']
			},
			{
				id: 7,
				displayText: 'y',
				latex: ['y']
			}
			// {
			// 	id : 5,
			// 	displayText : '@',
			// 	latex : ['@']
			// },

			// {
			// 	id : 7,
			// 	displayText : '<',
			// 	latex : ['<']
			// },
			// {
			// 	id : 8,
			// 	displayText : '≤',
			// 	latex : ['\\le ' , 'key-Backspace']
			// },
			// {
			// 	id : 9,
			// 	displayText : '÷',
			// 	latex : ['\\frac ' , 'key-Backspace']
			// }
		],
		second: [{
				id: 1,
				displayText: 'log(x)',
				latex: ['\\log()', 'key-Left'],
				colspan: 1,
				spec: true
			},
			{
				id: 2,
				displayText: 'log<sub>y</sub>(x)',
				latex: ['\\log_', 'key-Right', '()', 'key-Left', 'key-Left', 'key-Left'],
				colspan: 1,
				spec: true
			},
			{
				id: 3,
				displayText: 'π',
				colspan: 1,
				latex: ['\\pi ', 'key-Backspace']
			},
			// {
			// 	id : 4,
			// 	displayText : '%',
			// 	latex : ['%']
			// },
			{
				id: 4,
				displayText: '<',
				colspan: 1,
				latex: ['<']
			},
			{
				id: 5,
				displayText: '≤',
				colspan: 1,
				latex: ['\\le ', 'key-Backspace']
			},
			{
				id: 6,
				displayText: '>',
				colspan: 1,
				latex: ['>']
			},
			{
				id: 7,
				displayText: '≥',
				colspan: 1,
				latex: ['\\ge ', 'key-Backspace']
			},
			// {
			// 	id : 7,
			// 	displayText : ',',
			// 	latex : [',']
			// },
			// {
			// 	id : 8,
			// 	displayText : '^',
			// 	latex : ['^']
			// },
			{
				id: 9,
				colspan: 1,
				displayText: '<span class="icon-back fontFile"><span>',
				latex: ['key-Backspace']
			}
		],
		third: [{
				id: 1,
				colspan: 4,
				displayText: '<span class="icon-top-arrow fontFile"></span>',
				latex: ['key-Up']
			},

			{
				id: 2,
				colspan: 4,
				displayText: '<span class="icon-Left-Arrow fontFile"></span>',
				latex: ['key-Left']
			},
			{
				id: 3,
				colspan: 4,
				displayText: '<span class="icon-Down-Arrow fontFile"></span>',
				latex: ['key-Down']
			},
			{
				id: 4,
				colspan: 4,
				displayText: '<span class="icon-Right-arrow fontFile"></span>',
				latex: ['key-Right']
			},
			{
				id: 5,
				colspan: 4,
				displayText: '<span class="icon-Enter fontFile"></span>'
			}
		],
		four: [{
				id: 1,
				displayText: '123',
				colspan: 6,
				//addClass : 'number'
			},
			{
				id: 2,
				displayText: 'ABC',
				colspan: 6
			},
			{
				id: 3,
				displayText: 'SYM',
				colspan: 6
			},
			{
				id: 4,
				displayText: '<span class="icon-space-bar fontFile"></span>',
				colspan: 3,
				latex: ['\\ ']
			},

			{
				id: 5,
				displayText: '<span class="icon-Close-keyboard fontFile"></span>',
				colspan: 6,
			}
			// {
			// 	id : 5,
			// 	displayText : 'Save',
			// 	colspan : 6,
			// 	addClass : 'done-btn'
			// }
		]
	},


	// numberPanel : {
	// 	first : [
	// 		{
	// 			id : 1,
	// 			displayText : '1',
	// 			latex : ['1']
	// 		},
	// 		{
	// 			id : 2,
	// 			displayText : '2',
	// 			latex : ['2']
	// 		},
	// 		{
	// 			id : 3,
	// 			displayText : '3',
	// 			latex : ['3']
	// 		},
	// 		{
	// 			id : 4,
	// 			displayText : '4',
	// 			latex : ['4']
	// 		},
	// 		{
	// 			id : 5,
	// 			displayText : '5',
	// 			latex : ['5']
	// 		},
	// 		{
	// 			id : 6,
	// 			displayText : '6',
	// 			latex : ['6']
	// 		},
	// 		{
	// 			id : 7,
	// 			displayText : '7',
	// 			latex : ['7']
	// 		},
	// 		{
	// 			id : 8,
	// 			displayText : '8',
	// 			latex : ['8']
	// 		},
	// 		{
	// 			id : 9,
	// 			displayText : '9',
	// 			latex : ['9']
	// 		},
	// 		{
	// 			id : 10,
	// 			displayText : '0',
	// 			latex : ['0']
	// 		}
	// 	],
	// 	second : [
	// 		{
	// 			id : 1,
	// 			displayText : '+',
	// 			latex : ['+']
	// 		},
	// 		{
	// 			id : 2,
	// 			displayText : '-',
	// 			latex : ['-']
	// 		},
	// 		{
	// 			id : 3,
	// 			displayText : '*',
	// 			latex : ['\\cdot ']
	// 		},
	// 		{
	// 			id : 4,
	// 			displayText : '/',
	// 			latex : ['\\frac ' , 'key-Backspace']
	// 		},
	// 		{
	// 			id : 5,
	// 			displayText : '%',
	// 			latex : ['%']
	// 		},
	// 		{
	// 			id : 6,
	// 			displayText : '^',
	// 			latex : ['^']
	// 		},
	// 		{
	// 			id : 7,
	// 			displayText : '$',
	// 			latex : ['$']
	// 		},
	// 		{
	// 			id : 8,
	// 			displayText : ';',
	// 			latex : [';']
	// 		},
	// 		{
	// 			id : 9,
	// 			displayText : ',',
	// 			latex : [',']
	// 		},
	// 		{
	// 			id : 10,
	// 			displayText : '<span class="icon-back fontFile"><span>',
	// 			latex : ['key-Backspace']
	// 		}
	// 	],
	// 	third : [
	// 		{
	// 			id : 1,
	// 			displayText : '',
	// 			isEmpty : true
	// 		},
	// 		{
	// 			id : 2,
	// 			displayText : '<',
	// 			latex : ['<']
	// 		},
	// 		{
	// 			id : 3,
	// 			displayText : '>',
	// 			latex : ['>']
	// 		},
	// 		{
	// 			id : 4,
	// 			displayText : '(',
	// 			latex : ['(']
	// 		},
	// 		{
	// 			id : 5,
	// 			displayText : ')',
	// 			latex : [')']
	// 		},
	// 		{
	// 			id : 6,
	// 			displayText : '`',
	// 			latex : ['`']
	// 		},
	// 		{
	// 			id : 7,
	// 			displayText : '=',
	// 			latex : ['=']
	// 		},
	// 		{
	// 			id : 8,
	// 			displayText : '.',
	// 			latex : ['.']
	// 		},
	// 		{
	// 			id : 9,
	// 			displayText : '',
	// 			isEmpty : true
	// 		},
	// 		{
	// 			id : 10,
	// 			displayText : '<span class="icon-Enter fontFile"></span>'
	// 		}
	// 	],
	// 	four : [
	// 		{
	// 			id : 1,
	// 			displayText : 'Math',
	// 			colspan : 2,
	// 			addClass : 'mathPanel'
	// 		},
	// 		{
	// 			id : 2,
	// 			displayText : '',
	// 			colspan : 5,
	// 			latex : ['\\ ']
	// 		},
	// 		{
	// 			id : 3,
	// 			displayText : '<span class="icon-four-arrow fontFile"></span>'
	// 		},
	// 		{
	// 			id : 4,
	// 			displayText : 'Done',
	// 			colspan : 2,
	// 			addClass : 'done-btn'
	// 		},
	// 		{
	// 			id:5,
	// 			displayText : 'D5895one',
	// 			colspan : 4,
	// 			addClass : 'done-btnn'
	// 		}
	// 	]
	// },

	symbolPanel: {
		first: [{
				id: 1,
				displayText: '!',
				latex: ['!']
			},
			{
				id: 2,
				displayText: '@',
				latex: ['@']
			},
			{
				id: 3,
				displayText: '#',
				latex: ['#']
			},
			{
				id: 4,
				displayText: '~',
				latex: ['~']
			},
			{
				id: 5,
				displayText: '{',
				latex: ['{']
			},
			{
				id: 6,
				displayText: '}',
				latex: ['}']
			},
			{
				id: 7,
				displayText: '[',
				latex: ['[']
			},
			{
				id: 8,
				displayText: ']',
				latex: [']']
			},
			{
				id: 9,
				displayText: ':',
				latex: [':']
			},
			{
				id: 10,
				displayText: '"',
				latex: ['"']
			}

		],
		second: [{
				id: 1,
				displayText: '|',
				latex: ['|']
			},
			{
				id: 2,
				displayText: 'θ',
				latex: ['θ']
			},

			{
				id: 3,
				displayText: '●',
				latex: ['●']
			},
			{
				id: 4,
				displayText: '◆',
				latex: ['◆']
			},
			{
				id: 5,
				displayText: '&',
				latex: ['&']
			},
			{
				id: 6,
				displayText: '?',
				latex: ['?']
			},
			{
				id: 7,
				displayText: '_',
				latex: ['_']
			},
			{
				id: 8,
				displayText: '<span class=" icon-symbol_degree fontFile"></span>',
				// latex : ['^{\circ}'],
				latex: ['^˚'],
			},
			{
				id: 9,
				displayText: '△',
				latex: ['△']
			}

		]
	},
	// navPanel1: {
	// 	first : [
	// 		{
	// 			id : 1,
	// 			displayText : '!',
	// 			isEmpty : true
	// 		},
	// 		{
	// 			id : 2,
	// 			displayText : '<span class="icon-top-arrow fontFile"></span>',
	// 			latex : ['key-Up']
	// 		},
	// 		{
	// 			id : 3,
	// 			displayText : '',
	// 			isEmpty : true
	// 		}
	// 	],
	// 	second : [
	// 		{
	// 			id : 1,
	// 			displayText : '<span class="icon-Left-Arrow fontFile"></span>',
	// 			latex : ['key-Left']
	// 		},
	// 		{
	// 			id : 2,
	// 			displayText : '<span class="icon-Down-Arrow fontFile"></span>',
	// 			latex : ['key-Down']
	// 		},
	// 		{
	// 			id : 3,
	// 			displayText : '<span class="icon-Right-arrow fontFile"></span>',
	// 			latex : ['key-Right']
	// 		}
	// 	]
	// },

	choosePanel: {
		first: [{
				id: 1,
				displayText: 'q',
				latex: ['q']
			},
			{
				id: 2,
				displayText: 'w',
				latex: ['w']
			},
			{
				id: 3,
				displayText: 'e',
				latex: ['e']
			},
			{
				id: 4,
				displayText: 'r',
				latex: ['r']
			},
			{
				id: 5,
				displayText: 't',
				latex: ['t']
			},
			{
				id: 6,
				displayText: 'y',
				latex: ['y']
			},
			{
				id: 7,
				displayText: 'u',
				latex: ['u']
			},
			{
				id: 8,
				displayText: 'i',
				latex: ['i']
			},
			{
				id: 9,
				displayText: 'o',
				latex: ['o']
			},
			{
				id: 10,
				displayText: 'p',
				latex: ['p']
			}
		],
		second: [{
				id: 1,
				displayText: 'a',
				latex: ['a']
			},
			{
				id: 2,
				displayText: 's',
				latex: ['s']
			},
			{
				id: 3,
				displayText: 'd',
				latex: ['d']
			},
			{
				id: 4,
				displayText: 'f',
				latex: ['f']
			},
			{
				id: 5,
				displayText: 'g',
				latex: ['g']
			},
			{
				id: 6,
				displayText: 'h',
				latex: ['h']
			},
			{
				id: 7,
				displayText: 'j',
				latex: ['j']
			},
			{
				id: 8,
				displayText: 'k',
				latex: ['k']
			},
			{
				id: 9,
				displayText: 'l',
				latex: ['l']
			}
		],
		third: [{
				id: 1,
				displayText: '<span class="icon-caps_off fontFile"></span>',
				//latex : ['CAP']
			},
			{
				id: 2,
				displayText: 'z',
				latex: ['z']
			},
			{
				id: 3,
				displayText: 'x',
				latex: ['x']
			},
			{
				id: 4,
				displayText: 'c',
				latex: ['c']
			},
			{
				id: 5,
				displayText: 'v',
				latex: ['v']
			},
			{
				id: 6,
				displayText: 'b',
				latex: ['b']
			},
			{
				id: 7,
				displayText: 'n',
				latex: ['n']
			},
			{
				id: 8,
				displayText: 'm',
				latex: ['m']
			}
		]
	},
	choosePanel3: {
		first: [{
				id: 1,
				displayText: 'Q',
				latex: ['Q']
			},
			{
				id: 2,
				displayText: 'W',
				latex: ['W']
			},
			{
				id: 3,
				displayText: 'E',
				latex: ['E']
			},
			{
				id: 4,
				displayText: 'R',
				latex: ['R']
			},
			{
				id: 5,
				displayText: 'T',
				latex: ['T']
			},
			{
				id: 6,
				displayText: 'Y',
				latex: ['Y']
			},
			{
				id: 7,
				displayText: 'U',
				latex: ['U']
			},
			{
				id: 8,
				displayText: 'I',
				latex: ['I']
			},
			{
				id: 9,
				displayText: 'O',
				latex: ['O']
			},
			{
				id: 10,
				displayText: 'P',
				latex: ['P']
			}
		],
		second: [{
				id: 1,
				displayText: 'A',
				latex: ['A']
			},
			{
				id: 2,
				displayText: 'S',
				latex: ['S']
			},
			{
				id: 3,
				displayText: 'D',
				latex: ['D']
			},
			{
				id: 4,
				displayText: 'F',
				latex: ['F']
			},
			{
				id: 5,
				displayText: 'G',
				latex: ['G']
			},
			{
				id: 6,
				displayText: 'H',
				latex: ['H']
			},
			{
				id: 7,
				displayText: 'J',
				latex: ['J']
			},
			{
				id: 8,
				displayText: 'K',
				latex: ['K']
			},
			{
				id: 9,
				displayText: 'L',
				latex: ['L']
			}
		],
		third: [{
				id: 1,
				displayText: '<span class="icon-caps_on fontFile"></span>',

			},
			{
				id: 2,
				displayText: 'Z',
				latex: ['Z']
			},
			{
				id: 3,
				displayText: 'X',
				latex: ['X']
			},
			{
				id: 4,
				displayText: 'C',
				latex: ['C']
			},
			{
				id: 5,
				displayText: 'V',
				latex: ['V']
			},
			{
				id: 6,
				displayText: 'B',
				latex: ['B']
			},
			{
				id: 7,
				displayText: 'N',
				latex: ['N']
			},
			{
				id: 8,
				displayText: 'M',
				latex: ['M']

			}
		]
	},

	choosePanel2: {
		first: [{
				id: 1,
				displayText: '1',
				latex: ['1']
			},
			{
				id: 2,
				displayText: '2',
				latex: ['2']
			},
			{
				id: 3,
				displayText: '3',
				latex: ['3']
			},
			{
				id: 4,
				displayText: '4',
				latex: ['4']
			},
			{
				id: 5,
				displayText: '5',
				latex: ['5']
			},
			{
				id: 6,
				displayText: '6',
				latex: ['6']
			},
			{
				id: 7,
				displayText: '7',
				latex: ['7']
			},
			{
				id: 8,
				displayText: '8',
				latex: ['8']
			},
			{
				id: 9,
				displayText: '9',
				latex: ['9']
			},
			{
				id: 10,
				displayText: '0',
				latex: ['0']
			}
		],
		second: [{
				id: 1,
				displayText: '+',
				latex: ['+']
			},
			{
				id: 2,
				displayText: '-',
				latex: ['-']
			},
			{
				id: 3,
				displayText: '*',
				latex: ['*']
			},
			{
				id: 4,
				displayText: '/',
				latex: ['/']
			},
			{
				id: 5,
				displayText: '%',
				latex: ['%']
			},
			{
				id: 6,
				displayText: '<span class="icon-Caret fontFile"></span>',
				latex: ['^']
			},
			{
				id: 7,
				displayText: '$',
				latex: ['$']
			},
			{
				id: 8,
				displayText: ';',
				latex: [';']
			},
			{
				id: 9,
				displayText: ',',
				latex: [',']
			}
		],
		third: [{
				id: 1,
				displayText: '<',
				latex: ['<']
			},
			{
				id: 2,
				displayText: '>',
				latex: ['>']
			},
			{
				id: 3,
				displayText: '(',
				latex: ['(']
			},
			{
				id: 4,
				displayText: ')',
				latex: [')']
			},
			{
				id: 5,
				displayText: '<span class="icon-Apostrophe fontFile"></span>',
				latex: ["'"]
			},
			{
				id: 6,
				displayText: '=',
				latex: ['=']
			},
			{
				id: 7,
				displayText: '<span class="icon-Dot fontFile"></span>',
				latex: ['.']
			}
		]
	}
};