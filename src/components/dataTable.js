import React from "react";
import { Table, Tag, Space } from 'antd';
import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';



class DataTable extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        console.log(this.props)
        this.state = {
            csvData: this.props.csvData?.data,
            searchText: '',
            searchedColumn: ''
        }
    }

    componentDidMount() {
        this.setState({
            csvData: this.props.csvData?.data,
        })
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            this.setState({
                                searchText: selectedKeys[0],
                                searchedColumn: dataIndex,
                            });
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    render() {
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                sorter: (a, b) => a.id - b.id,
                sortDirections: ['descend', 'ascend'],
                width: '15%',
                ellipsis: true,
                ...this.getColumnSearchProps('id')
            },
            {
                title: 'User ID',
                dataIndex: 'userid',
                key: 'userid',
                sorter: (a, b) => a.id - b.id,
                sortDirections: ['descend', 'ascend'],
                width: '15%',
                ...this.getColumnSearchProps('userid')
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
                sorter: (a, b) => a.email.localeCompare(b.email),
                sortDirections: ['descend'],
                width: '15%',
                ...this.getColumnSearchProps('email')


            },
            {
                title: 'Api Call',
                dataIndex: 'apicall',
                key: 'apicall',
                width: '15%',
                sorter: (a, b) => a.apicall.localeCompare(b.apicall),
                ...this.getColumnSearchProps('apicall')

            },
            {
                title: 'Payload',
                dataIndex: 'payload',
                key: 'payload',
                width: '40%',
                sorter: (a, b) => a.payload.localeCompare(b.payload),
                ...this.getColumnSearchProps('payload')

            },
        ]

        return (
            <>
                <div className="container">
                    <Table
                        columns={columns}
                        dataSource={this.state.csvData}
                        bordered={true}
                        pagination={{
                            showTotal: total => ` a total of ${this.state.csvData.length}  article `,
                            showQuickJumper: true,
                            size: 'small',
                            showSizeChanger: true,
                            hideOnSinglePage: true
                        }}
                    />

                </div>

            </>
        )
    }
}

export default DataTable;
