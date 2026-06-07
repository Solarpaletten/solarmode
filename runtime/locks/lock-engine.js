const fs = require('fs');
const path = require('path');

const LOCKS_DIR =
    __dirname

function createLock(taskId) {

    const lockPath =

        path.join(
            LOCKS_DIR,
            `${taskId}.lock`
        )

    try {

        fs.writeFileSync(
            lockPath,
            '',
            {
                flag: 'wx'
            }
        )

        return true

    } catch (e) {

        return false

    }


}

function removeLock(taskId) {
    try {
        fs.unlinkSync(
            path.join(
                LOCKS_DIR,
                `${taskId}.lock`
            )
        );
    } catch (e) {
        console.error(`Failed to remove lock for ${taskId}:`, e);
    }
}

module.exports = {
    createLock,
    removeLock
}