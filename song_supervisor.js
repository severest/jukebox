const { spawn } = require('child_process');
const {
  sequelize,
  Song,
} = require('./models/index.js').sequelize;

console.log('Starting song supervisor....');

let mpvProcess;
let playingSongId;

const resetMpv = () => {
  Song.findByPk(playingSongId).then((song) => {
    song.update({
      currentlyPlaying: false,
    });
    playingSongId = null;
    mpvProcess = null;
  });
};

setInterval(() => {
  if (!playingSongId) {
    Song.findOne({
      where: { playedAt: null },
      order: [['id', 'ASC']],
    }).then((song) => {
      if (song) {
        console.log(`Song found: ${song.url}. Playing....`);
        playingSongId = song.id;
        mpvProcess = spawn('mpv', [song.url, '--no-video']);
        mpvProcess.on('close', resetMpv);
        song.update({
          playedAt: sequelize.fn('NOW'),
          currentlyPlaying: true,
        });
      }
    });
  } else {
    Song.findByPk(playingSongId).then((song) => {
      if (song.turnMeOff > 3) {
        mpvProcess.kill();
      }
    });
  }
}, 5000);
