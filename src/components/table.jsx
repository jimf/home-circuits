import useCircuitData from '../hooks/use-circuit-data';
import TableHeader from './table-header';
import FilterableText from './filterable-text';

const columns = [
    {
        label: 'Circuit',
        value: 'circuit',
    },
    {
        label: 'Amps',
        value: 'amps',
    },
    {
        label: 'Location',
        value: 'location',
        canFilter: true,
    },
    {
        label: 'Description',
        value: 'description',
        canFilter: true,
        canSort: false,
    },
];

const Table = () => {
    const {
        data,
        filterText,
        setFilterText,
        sortColumn,
        sortDirection,
        toggleSortColumn
    } = useCircuitData();

    return (
        <>
            <div>
                <label htmlFor="table-filter-text">
                    Filter table
                </label>
                <div className="flex">
                    <input id="table-filter-text" value={filterText} onChange={e => setFilterText(e.target.value)} />
                    <button type="button" onClick={() => setFilterText('')}>Clear</button>
                </div>
            </div>
            <div className="table-wrap">
                <div className="table-wrap-inner">
                    <table className="table">
                        <thead>
                            <tr>
                                {columns.map(({ label, value, ...columnProps }) => (
                                    <TableHeader
                                        {...columnProps}
                                        key={value}
                                        sortColumn={sortColumn}
                                        sortDirection={sortDirection}
                                        toggleSortColumn={toggleSortColumn}
                                        value={value}
                                    >
                                        {label}
                                    </TableHeader>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(row => (
                                <tr key={row.id}>
                                    {columns.map(column => (
                                        <td key={column.value}>
                                            {column.canFilter ? (
                                                <FilterableText
                                                    filterText={filterText}
                                                    value={row[column.value]}
                                                />
                                            ) : row[column.value]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Table;
