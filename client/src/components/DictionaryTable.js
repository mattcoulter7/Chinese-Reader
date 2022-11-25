import React from 'react';
import { createRoot } from 'react-dom/client';

import * as Slick from 'slickgrid-es6'

import WordDAO from "../DAOs/WordDAO";

import "../styles/DictionaryTable.scss";

// data view
const columnFilters = {};
const dv = new Slick.Data.DataView();
dv.setFilter(item => {
    let pass = true;
    for (let key in item) {
        if (key in columnFilters && columnFilters[key].length) {
            pass = pass && String(item[key]).match(new RegExp(columnFilters[key], 'ig'));
        }
    }
    return pass;
});
// end data view

// filter renderer is a react component
class Filter extends React.Component {
    handleChange = ({ target }) => {
        const value = target.value.trim()
        if (value.length) {
            this.props.columnFilters[this.props.columnId] = value;
        }
        else {
            delete this.props.columnFilters[this.props.columnId]
        }

        this.props.dv.refresh();
    }

    render() {
        return <input defaultValue={this.props.columnFilters[this.props.columnId]} type='text' className='editor-text' onChange={this.handleChange} />
    }
}

export default class DictionaryTable extends React.Component {
    columns = [
        {
            id: "traditional",
            name: "Traditional",
            field: "traditional",
            maxWidth: 100,
            sortable: true
        },
        {
            id: "simplified",
            name: "Simplified",
            field: "simplified",
            maxWidth: 100,
            sortable: true
        },
        {
            id: "pinyin",
            name: "Pinyin",
            field: "pinyin",
            maxWidth: 200,
            sortable: true
        },
        {
            id: "definition",
            name: "Definition",
            field: "definition",
            sortable: true
        }
    ];

    options = {
        editable: true,
        enableAddRow: !true,
        enableCellNavigation: true,
        enableAsyncPostRender: true,
        autoEdit: false,
        forceFitColumns: true,
        showHeaderRow: true,
        explicitInitialization: true
    };

    handleResize = () => {
        this.gridInstance.setColumns(this.columns)
    }

    state = {
        words: null
    }

    gridInstance = null;

    componentDidUpdate() {
        dv.setItems(this.state.words);
        this.gridInstance = new Slick.Grid("#dictionaryTable", dv, this.columns, this.options);
        this.gridInstance.onHeaderRowCellRendered.subscribe((e, { node, column }) => {
            createRoot(node).render(<Filter columnId={column.id} columnFilters={columnFilters} dv={dv} />);
            node.classList.add('slick-editable');
        });
        dv.onRowCountChanged.subscribe(() => {
            this.gridInstance.updateRowCount();
            this.gridInstance.render();
        });
        dv.onRowsChanged.subscribe((e, { rows }) => {
            this.gridInstance.invalidateRows(rows);
            this.gridInstance.render();
        });
        this.gridInstance.onSort.subscribe(function (e, args) {
            const comparer = function (a, b) {
                return (a[args.sortCol.field] > b[args.sortCol.field]) ? 1 : -1;
            }
            dv.sort(comparer, args.sortAsc);
        });
        this.gridInstance.init();
        window.addEventListener('resize', this.handleResize);
    }
    componentDidMount() {
        WordDAO.select().then((words) => {
            words = words.map(w => ({
                ...w.toJSON(),
                id:w._id
            }))
            this.setState({
                words: words
            })
        });
    }
    componentWillUnmount() {
        if (this.gridInstance) {
            this.gridInstance.destroy();
        }
        window.removeEventListener('resize', this.handleResize);
    }

    render() {
        if (this.state.words) {
            return (<div className='section'>
                <div id="dictionaryTable" className="slickgrid-container" style={{
                    minHeight: "98vh"
                }}></div>
            </div>)
        }
        return <div>Loading...</div>
    }
}