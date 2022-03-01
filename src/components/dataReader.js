import React from 'react';
import Papa from 'papaparse';
import DataTable from './dataTable';

class DataReader extends React.Component {
    constructor() {
        super();
        this.state = {
            csvData: null
        }
    }

    load = async () => {
        await fetch('/data.csv')
            .then(async responseText => {
                const reader = responseText.body.getReader();
                const result = await reader.read(); // raw array
                const decoder = new TextDecoder("utf-8");
                const csv = decoder.decode(result.value);
                Papa.parse(csv, {
                    header: true,
                    meta: {
                        fields: ['id', 'userid', 'email', 'apicall', 'payload']
                    },
                    complete: (resData) => {
                        this.setState({
                            csvData: resData
                        })
                    }
                })
            });
    }

    componentDidMount() {
        console.log("Did Mount")
        this.load()
    }

    componentDidUpdate() {
        console.log("Did Update")
        console.log(this.state)
    }

    render() {
        return (
            <>
                {this.state.csvData && <DataTable csvData={this.state.csvData} />}
            </>
        )
    }
}

export default DataReader;
