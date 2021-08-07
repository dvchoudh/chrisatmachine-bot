module.exports = (client, message, queue, track) => {
    message.channel.send(`Chad-Bot - ${track.title} has been added to the queue!`);
};