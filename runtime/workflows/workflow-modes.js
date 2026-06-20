const modes = {

    sequential: {

        description:

            "Run agents one by one"
    },

    parallel: {

        description:

            "Run agents simultaneously"
    },

    consensus: {
        
        description:

            "Run agents and create final decision"
    },

}

function getMode(name) {    

    return modes[name]

}

module.exports = {

    getMode

}
