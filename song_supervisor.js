const { spawn } = require('child_process');
const sequelize = require('./models/index.js').sequelize;
const Song = require('./models/index.js').Song;


console.log('Starting song supervisor....');

let mpvProcess;
let playingSongId;


const resetMpv = () => {
  Song.findById(playingSongId).then((song) => {
    song.update({
      currentlyPlaying: false,
    })
    playingSongId = null;
    mpvProcess = null;
  });
}

setInterval(() => {
  if (!playingSongId) {
    Song.findOne({
      where: {playedAt: null},
      order: [['id', 'DESC']],
    }).then((song) => {
      if (song) {
        console.log(`Song found: ${song.url}. Playing....`);
        song.update({
          playedAt: sequelize.fn('NOW'),
          currentlyPlaying: true,
        }).then(() => {
          playingSongId = song.id;
          mpvProcess = spawn('mpv', [song.url, '--no-video']);
          mpvProcess.on('close', resetMpv);
        });
      }
    });
  } else {
    Song.findById(playingSongId).then((song) => {
      if (song.turnMeOff > 3) {
        mpvProcess.kill();
      }
    });
  }
}, 5000);
