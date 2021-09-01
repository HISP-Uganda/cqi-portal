import { Box } from "@chakra-ui/react";
import { useCallback, useMemo } from "react";
import { FixedSizeList } from 'react-window';
import { useBlockLayout, useTable } from 'react-table';

export function DisplayTable({ columns, data }: any) {

  const defaultColumn = useMemo(
    () => ({
      width: 300,
    }),
    []
  )


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useBlockLayout
  )

  const RenderRow = useCallback(
    ({ index, style }) => {
      const row = rows[index]
      prepareRow(row)
      return (
        <Box
          {...row.getRowProps({
            style,
          })}
          bg="yellow.200"
          className="tr"
        >
          {row.cells.map(cell => {
            return (
              <Box {...cell.getCellProps()} className="td">
                {cell.render('Cell')}
              </Box>
            )
          })}
        </Box>
      )
    },
    [prepareRow, rows]
  )

  return (
    <Box {...getTableProps()} className="table">
      <Box>
        {headerGroups.map(headerGroup => (
          <Box {...headerGroup.getHeaderGroupProps()} className="tr">
            {headerGroup.headers.map(column => (
              <Box {...column.getHeaderProps()} className="th">
                {column.render('Header')}
              </Box>
            ))}
          </Box>
        ))}
      </Box>

      <Box {...getTableBodyProps()}>
        <FixedSizeList
          height={750}
          itemCount={rows.length}
          itemSize={35}
          width={window.innerWidth - 70}
        >
          {RenderRow}
        </FixedSizeList>
      </Box>
    </Box>
  )
}