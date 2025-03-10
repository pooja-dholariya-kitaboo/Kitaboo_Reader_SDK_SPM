var desktopKeyboardData = {
	math : {
		first : [
			{
				id : 1,
				displayText : '<span class="icon-x-upon-y fontFile"></span>',
				latex : ['\\frac ' , 'key-Backspace']
			},
			{
				id : 2,
				displayText : '√x',
				latex : ['\\sqrt ' , 'key-Backspace']
			},
			{
				id : 3,
				displayText : '<span>&#8319;</span>√',
				latex : ['x' , '^','key-Left','key-Backspace' ,'key-Right', 'key-Right', '\\sqrt ' , 'key-Backspace' , 'key-Left' , 'key-Left'],
			},
			{
				id : 4,
				displayText : 'x<sup>y</sup>',
				latex : ['^' , 'key-Left']
			},
			{
				id : 5,
				displayText : '$',
				latex : ['$']
			},
			{
				id : 6,
				displayText : '|x|',
				latex : ['|'],
				spec : true
			},
			{
				id : 1,
				displayText : 'log(x)',
				latex : ['\\log()' , 'key-Left'],
				spec : true
			},
			{
				id : 2,
				displayText : 'log<sub>y</sub>(x)',
				latex : ['\\log_' , 'key-Right' , '()' , 'key-Left', 'key-Left', 'key-Left'],
				spec : true
			},
			{
				id : 3,
				displayText : 'π',
				latex:['\\pi ' , 'key-Backspace']
			},
			{
				id : 4,
				displayText : '%',
				latex : ['%']
			},	
			{
				id : 7,
				displayText : '<',
				latex : ['<']
			},
			{
				id : 8,
				displayText : '≤',
				latex : ['\\le ' , 'key-Backspace']
			},			
			{
				id : 5,
				displayText : '>',
				latex : ['>']
			},
			{
				id : 6,
				displayText : '≥',
				latex : ['\\ge ', 'key-Backspace']
			},
			{
				id : 9,
				displayText : '÷',
				latex : ['\\frac ' , 'key-Backspace']
			},
			{
				id : 5,
				displayText : '',
				colspan : 4,
				latex : ['\\ ']
			}
		],
		second : [			
			{
				id : 9,
				displayText : '<span class="icon-back fontFile"><span>',
				latex : ['key-Backspace']
			}
		],
		third : [
			{
				id : 1,
				displayText : '(',
				latex : ['(']
			},
			{
				id : 2,
				displayText : ')',
				latex : [')']
			},			
			{
				id : 8,
				displayText : '^',
				latex : ['^']
			},
			{
				id : 7,
				displayText : ',',
				latex : [',']
			},
			{
				id : 3,
				displayText : 'x',
				latex : ['x']
			},
			{
				id : 4,
				displayText : 'y',
				latex : ['y']
			},
			{
				id : 2,
				displayText : 'Choose Variable',
				colspan : 4
			}
		],
		four : [
			{
				id : 1,
				displayText : '7',
				latex : ['7']
			},
			{
				id : 2,
				displayText : '8',
				latex : ['8']
			},
			{
				id : 3,
				displayText : '9',
				latex : ['9']
			},
			{
				id : 4,
				displayText : '+',
				latex : ['+']
			},			
			{
				id : 5,
				displayText : '4',
				latex : ['4']
			},
			{
				id : 6,
				displayText : '5',
				latex : ['5']
			},
			{
				id : 7,
				displayText : '6',
				latex : ['6']
			},
			{
				id : 8,
				displayText : '-',
				latex : ['-']
			},			
			{
				id : 9,
				displayText : '1',
				latex : ['1']
			},
			{
				id : 10,
				displayText : '2',
				latex : ['2']
			},
			{
				id : 11,
				displayText : '3',
				latex : ['3']
			},
			{
				id : 12,
				displayText : '*',
				latex : ['\\cdot ']
			},		
			{
				id : 13,
				displayText : '=',
				latex : ['=']
			},						
			{
				id : 14,
				displayText : '0',
				latex : ['0']
			},
			{
				id : 15,
				displayText : '.',
				latex : ['.']
			},
			{
				id : 16,
				displayText : '/',
				latex : ['\\frac ' , 'key-Backspace']
			}
		]
	},

	navPanel : {
			first: [
			{
				id : 1,
				displayText : 'Prev',
				isEmpty : true
			},
			{
				id : 2,
				displayText : '<span class="icon-top-arrow fontFile"></span>',
				latex : ['key-Up']
			},
			{
				id : 3,
				displayText : 'Next',
				isEmpty : true
			},
			{
				id : 4,
				displayText : '<span class="icon-Left-Arrow fontFile"></span>',
				latex : ['key-Left']
			},
			{
				id : 5,
				displayText : '<span class="icon-Down-Arrow fontFile"></span>',
				latex : ['key-Down']
			},
			{
				id : 6,
				displayText : '<span class="icon-Right-arrow fontFile"></span>',
				latex : ['key-Right']
			},			
			{
				id : 7,
				displayText : 'Done',
				colspan : 2,
				addClass : 'done-btn'
			}
		]
	},

	choosePanel : {
		first : [
			{
				id : 1,
				displayText : 'a',
				latex : ['a']
			},
			{
				id : 2,
				displayText : 'b',
				latex : ['b']
			},
			{
				id : 3,
				displayText : 'c',
				latex : ['c']
			},
			{
				id : 4,
				displayText : 'd',
				latex : ['d']
			},
			{
				id : 5,
				displayText : 'f',
				latex : ['f']
			},
			{
				id : 6,
				displayText : 'g',
				latex : ['g']
			},
			{
				id : 7,
				displayText : 'h',
				latex : ['h']
			}
		],
		second : [
			{
				id : 1,
				displayText : 'j',
				latex : ['j']
			},
			{
				id : 2,
				displayText : 'k',
				latex : ['k']
			},
			{
				id : 3,
				displayText : 'm',
				latex : ['m']
			},
			{
				id : 4,
				displayText : 'n',
				latex : ['n']
			},
			{
				id : 5,
				displayText : 'p',
				latex : ['p']
			},
			{
				id : 6,
				displayText : 'q',
				latex : ['q']
			},
			{
				id : 7,
				displayText : 'r',
				latex : ['r']
			}
		],
		third : [
			{
				id : 1,
				displayText : 's',
				latex : ['s']
			},
			{
				id : 2,
				displayText : 't',
				latex : ['t']
			},
			{
				id : 3,
				displayText : 'u',
				latex : ['u']
			},
			{
				id : 4,
				displayText : 'v',
				latex : ['v']
			},
			{
				id : 5,
				displayText : 'w',
				latex : ['w']
			},
			{
				id : 6,
				displayText : 'z',
				latex : ['z']
			}
		]
	}
}