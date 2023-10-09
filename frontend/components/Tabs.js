import { useState } from 'react';
import { Tab } from '@headlessui/react';
import Elipsis from './Elipsis';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Example({ children, childrenone, childrentwo }) {
  let [categories] = useState({
    Overview: '',
    Comments: '',
  });

  return (
    <div className="w-full max-w-md px-2 py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-black p-1">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-md py-2.5 text-sm font-medium leading-5 text-gray-300',
                  '',
                  selected
                    ? 'border-b-4 border-blue-600 focus:outline-none duration-300'
                    : ''
                )
              }
            >
              {category}
            </Tab>
          ))}
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full rounded-md py-2.5 text-sm font-medium leading-5 text-gray-300 text-center',
                '',
                selected
                  ? 'border-b-4 border-blue-600 focus:outline-none duration-300 text-center'
                  : ''
              )
            }
          >
            <p className="text-center pl-12 font-extrabold">
              <Elipsis />
            </p>
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel
            className={classNames('rounded-xl bg-black p-3', '')}
          >
            {children}
          </Tab.Panel>
          <Tab.Panel
            className={classNames('rounded-xl bg-black p-3', '')}
          >
            {childrenone}
          </Tab.Panel>
          <Tab.Panel
            className={classNames('rounded-xl bg-black p-3', '')}
          >
            {childrentwo}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
