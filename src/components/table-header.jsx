import PropTypes from 'prop-types';

const ariaSortMap = {
    asc: 'ascending',
    desc: 'descending',
};

const TableHeader = ({ canSort = true, children, sortColumn, sortDirection, toggleSortColumn, value }) => {
    return (
        <th aria-sort={sortColumn === value ? ariaSortMap[sortDirection] : undefined}>
            {canSort ? (
                <button
                    className="table-header-button"
                    onClick={() => toggleSortColumn(value)}
                    type="button"
                    value={value}
                >
                    {children}
                    {sortColumn === value && (
                        <i className={`bx bx-chevron-${sortDirection === 'asc' ? 'up' : 'down'}`} />
                    )}
                </button>
            ) : children}
        </th>
    );
};

TableHeader.propTypes = {
    canSort: PropTypes.bool,
    children: PropTypes.node,
    toggleSortColumn: PropTypes.func.isRequired,
    sortColumn: PropTypes.string,
    sortDirection: PropTypes.string,
    value: PropTypes.string.isRequired,
};

export default TableHeader;
