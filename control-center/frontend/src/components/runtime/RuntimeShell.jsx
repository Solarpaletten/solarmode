import RuntimeLayout
from "../../layouts/RuntimeLayout"

import AgentsPanel
from "./AgentsPanel"

import RuntimeCenter
from "./sections/RuntimeCenter"

import RuntimeRight
from "./sections/RuntimeRight"

import RuntimeBottom
from "./sections/RuntimeBottom"

export default function RuntimeShell() {

  return (

    <RuntimeLayout
      left={<AgentsPanel />}
      center={<RuntimeCenter />}
      right={<RuntimeRight />}
      bottom={<RuntimeBottom />}
    />

  )
}