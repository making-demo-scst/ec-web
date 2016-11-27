import axios from "axios";

const path = '';

class CustomerClient {

    fetch() {
        return axios.get(path + '/api/customers').then(x => x.data);
    }

    create(customer) {
        return axios.post(path + '/api/customers', customer).then(x => x.data);
    }
}

export default new CustomerClient();