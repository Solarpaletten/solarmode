function resetRouter() {

    const count =
        countRouterRecords()

    clear()

    fs.writeFileSync(
        ROUTER_FILE,
        JSON.stringify({}, null, 2),
        "utf8"
    )

    return count
}