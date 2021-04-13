import {CheckboxComponent} from "../checkbox/checkbox";

interface CheckboxGroupProps {
    groupName: string;
    description: string;
    items: {
        name: string;
        description: string;
    }[];
}

export const CheckboxGroupComponent = (props: CheckboxGroupProps) => (
  <div>
      <p>{props.description}</p>
      <div>
          { props.items.map(
              (item) => {
                  const fieldName = props.groupName + "." + item.name;
                  return <CheckboxComponent key={fieldName} name={fieldName} description={item.description} />
              }
          )}
      </div>
  </div>
);