import axios from "axios"
import { GeoJSONSchema } from "zod-geojson"

const API_URL = "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World/solve"
const API_KEY = "AAPK461196aa7ce04394b1777521b50b9a1dgQ_COFeHltTZH7TqDmHYILQEyD24C7JbDDsWdrPUneYqeLaEJBzzlKymEqBtX-fe"

export async function getArcGISRoute(a: { lat: number, long: number }, b: { lat: number, long: number }) {
    const res = await axios.get(API_URL, {
        params: {
            f: 'geojson',
            token: API_KEY,
            stops: `${a.long},${a.lat};${b.long},${b.lat}`,
            findBestSequence: true
        },
        headers: {
            'Content-Type': 'application/json'
        }
    })
    console.log(res.data)
    return await GeoJSONSchema.parseAsync(res.data)
}