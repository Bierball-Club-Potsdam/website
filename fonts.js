const Fontmin = require('fontmin');

const inDir = 'source/fonts/roboto/src/hinted/';
const outDir = 'source/fonts/min/';
const font = 'Roboto-Regular';

const blocks = [
    [0x0000, 0x007f], // basic latin
    [0x0080, 0x00ff], // latin-1 supplement
    [0x0100, 0x017f], // latin extended-a
    [0x0180, 0x024f], // latin extended-b
];

const chars = blocks
    .map((b) => [...Array(b[1] - b[0] + 1)].map((_, i) => i + b[0]))
    .flat();
const charsString = String.fromCharCode(...chars);

const fontmin = new Fontmin()
    .src(inDir + font + '.ttf')
    .dest(outDir)
    .use(Fontmin.glyph({ text: charsString, hinting: true }))
    .use(Fontmin.ttf2eot())
    .use(Fontmin.ttf2woff({ deflate: true }))
    .use(Fontmin.ttf2woff2({ deflate: true }));

fontmin.run();
