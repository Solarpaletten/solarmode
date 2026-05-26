import RuntimeMetricsPanel
from "../RuntimeMetricsPanel"

import RuntimeControlsPanel
from "../RuntimeControlsPanel"

import RuntimeQueuePanel
from "../RuntimeQueuePanel"

export default function RuntimeCenter() {

  return (

    <div>
      <RuntimeControlsPanel />
      <RuntimeMetricsPanel />
      <RuntimeQueuePanel />
    </div>

  )
}