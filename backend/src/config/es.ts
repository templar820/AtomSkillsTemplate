import { Client } from '@elastic/elasticsearch'
export default new Client({ node: 'http://host.docker.internal:9200' })

