const { spawn } = require('child_process');
const io = require('socket.io-client'); // eslint-disable-line

console.log('Starting song supervisor....');

const socket = io('http://localhost:9999', {
  path: '/cable',
  query: {
    token: 'jukeboxnode',
  },
});

socket.on('connect', () => console.log('connected'));
socket.on('connect_error', (err) => console.log(err));

// const {
//   sequelize,
//   Song,
// } = require('./models/index.js').sequelize;
//
//
//
// let mpvProcess;
// let playingSongId;
//
// const resetMpv = () => {
//   Song.findByPk(playingSongId).then((song) => {
//     song.update({
//       currentlyPlaying: false,
//     });
//     playingSongId = null;
//     mpvProcess = null;
//   });
// };
//
// setInterval(() => {
//   if (!playingSongId) {
//     Song.findOne({
//       where: { playedAt: null },
//       order: [['id', 'ASC']],
//     }).then((song) => {
//       if (song) {
//         console.log(`Song found: ${song.url}. Playing....`);
//         playingSongId = song.id;
//         mpvProcess = spawn('mpv', [song.url, '--no-video']);
//         mpvProcess.on('close', resetMpv);
//         song.update({
//           playedAt: sequelize.fn('NOW'),
//           currentlyPlaying: true,
//         });
//       }
//     });
//   } else {
//     Song.findByPk(playingSongId).then((song) => {
//       if (song.turnMeOff > 3) {
//         mpvProcess.kill();
//       }
//     });
//   }
// }, 5000);
