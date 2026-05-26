import RuntimeHealthPanel
from "../RuntimeHealthPanel"

import RuntimeIncidentsPanel
from "../RuntimeIncidentsPanel"

export default function RuntimeRight() {

  return (

    <div>
      <RuntimeHealthPanel />
      <RuntimeIncidentsPanel />
    </div>

  )
}