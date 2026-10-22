import { createClient } from "contentful";

const space = process.env.REACT_APP_API_SPACE;
const accessToken = process.env.REACT_APP_ACCESS_TOKEN;
export default space && accessToken ? createClient({ space, accessToken }) : null;
