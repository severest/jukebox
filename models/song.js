module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    url: DataTypes.STRING,
    playedAt: DataTypes.DATE,
    currentlyPlaying: DataTypes.BOOLEAN,
    turnMeOff: DataTypes.INTEGER,
  }, {});
  // Song.associate = (models) => {
  //   // associations can be defined here
  // };
  return Song;
};
