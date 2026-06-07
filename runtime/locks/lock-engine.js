const fs = require('fs');
const path = require('path');

const LOCKS_DIR =
    __dirname

function isLocked(taskId) {
    try {
        fs.accessSync(
            path.join(
                LOCKS_DIR,
                `${taskId}.lock`
            )
        );
        return true;
    } catch (e) {
        return false;
    }

}

function createLock(taskId) {
    try {
        fs.writeFileSync(
            path.join(
                LOCKS_DIR,
                `${taskId}.lock`
            ),
            ''
        );
    } catch (e) {
        console.error(`Failed to create lock for ${taskId}:`, e);
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
    isLocked,
    createLock,
    removeLock
}