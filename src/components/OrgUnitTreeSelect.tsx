import { Stack, Text } from "@chakra-ui/react";
import { TreeSelect, Select } from "antd";
import { useStore } from 'effector-react';
import { flatten } from 'lodash';
import { FC, useState } from "react";
import { $d2 } from "../Store";
type Unit = {
  id: string;
  name: string;
  path: string;
  leaf: boolean;
}
type Organisation = {
  children: Array<Unit>
}
type Response = {
  organisationUnits: Array<Organisation>
}
type OuSelectProps = {
  selectedOrgUnit: any;
  setSelectedOrgUnit: any;
  initialUnits: any[];
  initialLevels: any[];
  selectedLevel: any;
  setSelectedLevel: any;
}
const { Option } = Select;

const OrgUnitTreeSelect: FC<OuSelectProps> = ({ selectedOrgUnit, selectedLevel, setSelectedOrgUnit, setSelectedLevel, initialUnits, initialLevels }) => {
  const [units, setUnits] = useState<any[]>(initialUnits);
  const d2 = useStore($d2);
  const onLoadData = async (parent: any) => {
    try {
      const api = d2.Api.getApi();
      const { organisationUnits }: Response = await api.get("organisationUnits", {
        filter: `id:in:[${parent.id}]`,
        paging: "false",
        order: 'shortName:desc',
        fields: "children[id,name,path,leaf]",
      });
      const found = organisationUnits
        .map((unit: Organisation) => {
          return unit.children.map((child: Unit) => {
            return {
              id: child.id,
              pId: parent.id,
              value: child.id,
              title: child.name,
              isLeaf: child.leaf,
            };
          }).sort((a, b) => {
            if (a.title > b.title) {
              return 1;
            }
            if (a.title < b.title) {
              return -1;
            }
            return 0;
          });
        });
      setUnits([...units, ...flatten(found)]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Stack direction="row">
      <Stack>
        <Text>Organisation Unit</Text>
        <TreeSelect
          allowClear={true}
          treeDataSimpleMode
          size="large"
          style={{ width: "400px" }}
          value={selectedOrgUnit}
          // showArrow={false}
          multiple
          dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
          placeholder="Please select health centre"
          onChange={setSelectedOrgUnit}
          loadData={onLoadData}
          treeData={units}
        />
      </Stack>
      <Stack>
        <Text>Organisation Unit Level</Text>
        <Select value={selectedLevel} onChange={setSelectedLevel} size="large" style={{ width: '200px' }}>
          <Option value="">Select Level</Option>
          {initialLevels.map((level: any) => <Option key={level.id} value={level.value}>{level.name}</Option>)}
        </Select>
      </Stack>
    </Stack>
  );
};

export default OrgUnitTreeSelect;
