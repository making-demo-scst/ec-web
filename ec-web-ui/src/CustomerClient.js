import axios from "axios";

const path = '';

class CustomerClient {

    fetch() {
        return axios.get(path + '/customer-service/customers').then(x => x.data);
    }

    create(customer) {
        return axios.post(path + '/customer-service/customers', customer).then(x => x.data);
    }
}

export default new CustomerClient();