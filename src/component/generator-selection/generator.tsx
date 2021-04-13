import {Form, Formik, FormikValues} from "formik";
import React, {useState} from "react";
import {CheckboxGroupComponent} from "../checkboxgroup/checkboxgroup";
import {GeneratorResult} from "../generator-result/generator-result";

interface StringKeyBooleanValue {
    [key: string]: boolean;
}

interface GeneratorItem {
    name: string;
    description: string;
    isClass?: boolean;
}

interface GeneratorSelectItem extends GeneratorItem {
    initialValue: boolean;
}

interface FormValues {
    sex: StringKeyBooleanValue;
    race: StringKeyBooleanValue;
    moralAlignment: StringKeyBooleanValue;
    lawAlignment: StringKeyBooleanValue;
    occupation: StringKeyBooleanValue;
}

export interface GeneratorValues {
    sex: GeneratorItem[];
    race: GeneratorItem[];
    moralAlignment: GeneratorItem[];
    lawAlignment: GeneratorItem[];
    occupation: GeneratorItem[];
}


function getInitialValuesFromItems(items: GeneratorSelectItem[]): FormikValues {
    return items.reduce((accumulator, currentValue) => {
        // @ts-ignore
        accumulator[currentValue["name"]] = currentValue["initialValue"];
        return accumulator;
    }, {})
}


export const Generator = () => {
    const sexItems: GeneratorSelectItem[] = [
        {name: 'male', description: 'Male', initialValue: true},
        {name: 'female', description: 'Female', initialValue: true },
        {name: 'nonbinary', description: 'Non-Binary', initialValue: false}
    ];

    const raceItems: GeneratorSelectItem[] = [
        {name: 'human', description: 'Human', initialValue: true},
        {name: 'dwarf', description: 'Dwarf', initialValue: true},
        {name: 'elf', description: 'Elf', initialValue: true},
        {name: 'halfling', description: 'Halfling', initialValue: true},
        {name: 'dragonborn', description: 'Dragonborn', initialValue: true},
        {name: 'tiefling', description: 'Tiefling', initialValue: true},
        {name: 'halfelf', description: 'Half-Elf', initialValue: true},
        {name: 'halforc', description: 'Half-Orc', initialValue: true},
    ];

    const moralAlignmentItems: GeneratorSelectItem[] = [
        {name: 'good', description: 'Good', initialValue: true},
        {name: 'neutral', description: 'Neutral', initialValue: true},
        {name: 'bad', description: 'Bad', initialValue: true},
    ];

    const lawAlignmentItems: GeneratorSelectItem[] = [
        {name: 'lawful', description: 'Lawful', initialValue: true},
        {name: 'neutral', description: 'Neutral', initialValue: true},
        {name: 'chaotic', description: 'Chaotic', initialValue: true},
    ];

    const occupationsItems: GeneratorSelectItem[] = [
        {name: 'artificier', description: 'Artificier', initialValue: true, isClass: true},
        {name: 'barbarian', description: 'Barbarian', initialValue: true, isClass: true},
        {name: 'bard', description: 'Bard', initialValue: true, isClass: true},
        {name: 'cleric', description: 'Cleric', initialValue: true, isClass: true},
        {name: 'druid', description: 'Druid', initialValue: true, isClass: true},
        {name: 'fighter', description: 'Fighter', initialValue: true, isClass: true},
        {name: 'monk', description: 'Monk', initialValue: true, isClass: true},
        {name: 'mystic', description: 'Mystic', initialValue: true, isClass: true},
        {name: 'paladin', description: 'Paladin', initialValue: true, isClass: true},
        {name: 'ranger', description: 'Ranger', initialValue: true, isClass: true},
        {name: 'rogue', description: 'Rogue', initialValue: true, isClass: true},
        {name: 'sorcerer', description: 'Sorcerer', initialValue: true, isClass: true},
        {name: 'warlock', description: 'Warlock', initialValue: true, isClass: true},
        {name: 'wizard', description: 'Wizard', initialValue: true, isClass: true},
        {name: 'learned', description: 'Learned', initialValue: true, isClass: false},
        {name: 'lesser-nobility', description: 'Lesser Nobility', initialValue: true, isClass: false},
        {name: 'professional', description: 'Professional', initialValue: true, isClass: false},
        {name: 'working-class', description: 'Working Class', initialValue: true, isClass: false},
        {name: 'martial', description: 'Martial', initialValue: true, isClass: false},
        {name: 'underclass', description: 'Underclass', initialValue: true, isClass: false},
        {name: 'entertainer', description: 'Entertainer', initialValue: true, isClass: false},
    ];

    const [generatorData, setGeneratorData] = useState<GeneratorValues | undefined>();

    return (
        <>
      <Formik
        initialValues={
            {
                sex: getInitialValuesFromItems(sexItems),
                race: getInitialValuesFromItems(raceItems),
                moralAlignment: getInitialValuesFromItems(moralAlignmentItems),
                lawAlignment: getInitialValuesFromItems(lawAlignmentItems),
                occupation: getInitialValuesFromItems(occupationsItems),
            }
        }
        validate={values => {}}
        onSubmit={(values, { setSubmitting }) => {
            const resultValues = values as unknown as FormValues;

            const result: GeneratorValues = {
                sex: sexItems.filter(item => resultValues.sex[item.name]),
                race: raceItems.filter(item => resultValues.race[item.name]),
                moralAlignment: moralAlignmentItems.filter(item => resultValues.moralAlignment[item.name]),
                lawAlignment: lawAlignmentItems.filter(item => resultValues.lawAlignment[item.name]),
                occupation: occupationsItems.filter(item => resultValues.occupation[item.name])
            };

            console.log(result);
            setGeneratorData(result);
            setSubmitting(false);
        }}
      >
          {({ isSubmitting }) => (
              <Form>
                  <CheckboxGroupComponent groupName="sex" description="Gender" items={sexItems} />
                  <CheckboxGroupComponent groupName="race" description="People" items={raceItems} />
                  <CheckboxGroupComponent groupName="moralAlignment" description="Moral Alignment" items={moralAlignmentItems} />
                  <CheckboxGroupComponent groupName="lawAlignment" description="Law Alignment" items={lawAlignmentItems} />
                  <CheckboxGroupComponent groupName="occupation" description="Occupation" items={occupationsItems} />
                  <button type="submit" disabled={isSubmitting}>Generate</button>
              </Form>
          )}
      </Formik>
            <GeneratorResult data={generatorData}/>
        </>
    );
}