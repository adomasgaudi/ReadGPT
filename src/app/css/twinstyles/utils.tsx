export const merge = (DefComp: any, propsBASE: any) => {
  const MyComponent = ({ ...propsTOP }) => {
    const propsFINAL: any = {}

    // check base keys
    Object.keys(propsBASE).map((key: any) => {
      // pass in all base
      propsFINAL[key] = propsBASE[key]

      // pass in base with top
      if (propsTOP[key]) {
        propsFINAL[key] = [[...propsBASE[key]], [...propsTOP[key]]]
      }
      return null
    })

    // check new keys
    Object.keys(propsTOP).map((key: any) => {
      // pass in top
      if (!propsBASE[key]) {
        propsFINAL[key] = propsTOP[key]
      }

      return null
    })

    return <DefComp {...propsFINAL} />
  }

  return MyComponent
}
