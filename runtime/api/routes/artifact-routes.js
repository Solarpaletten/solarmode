// runtime/api/routes/artifact-routes.js

const fs = require('fs')

const path = require('path')

const {
    getALLArtifacts,
    getArtifactByName,
    getArtifactContent
} = require(
    "../../artifacts/artifact-registry"
)


function handleArtifactRoutes(
    pathname, 
    res,
    sendJson
) {

if (pathname === "/artifacts") {

        return sendJson(
            res,
            getALLArtifacts()
        )
    }

    if (
        pathname.startsWith("/artifacts/") &&
        pathname.endsWith("/content")
    ) {

        const artifactName =
            pathname
                .replace("/artifacts/", "")
                .replace("/content", "")

        return sendJson(
            res,
            getArtifactContent(
                artifactName
            )
        )
    }

    if (
        pathname.startsWith("/artifacts/")
    ) {

        const artifactName =
            pathname.split("/").pop()

        return sendJson(
            res,
            getArtifactByName(
                artifactName
            )
        )
    }

    return sendJson(
        res,
        {
            error: "Artifact not found"
        },
        404
    )
}

module.exports = {
    handleArtifactRoutes
}