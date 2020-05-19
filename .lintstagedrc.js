module.exports = {
    '*': () => [`prettier --write *`],
    '*.ts': () => [`npm run lint`],
};
