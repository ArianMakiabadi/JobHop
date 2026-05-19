import { Switch } from "@headlessui/react";

function Toggle({ checked, onChange }) {
  return (
    <Switch
      checked={checked}
      onChange={onChange}
      className={`${
        checked ? "bg-primary-500" : "bg-secondary-300"
      } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
    >
      <span
        className={`${
          checked ? "translate-x-6" : "translate-x-1"
        } inline-block h-4 w-4 transform rounded-full bg-secondary-0 transition-transform`}
      />
    </Switch>
  );
}

export default Toggle;
