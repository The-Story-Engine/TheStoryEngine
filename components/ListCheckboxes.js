export default function ListCheckboxes({
  lists,
  title,
  onChange,
  checked = [],
  isDisabled = false,
}) {
  lists = lists || [
    {
      value: "launch",
      title: "Launches",
      description:
        "3 launch emails: Writer accounts, Home workspaces and Community workspaces",
    },
    {
      value: "news",
      title: "News",
      description:
        "Every 2-4 weeks: New Story Engine features and blog posts (blog coming soon!).",
    },
  ];

  const handleChange = (event) => {
    const targetValue = event.target.name;
    const isTargetChecked = event.target.checked;
    const newChecked = isTargetChecked
      ? [...checked, targetValue]
      : checked.filter((inner) => inner != targetValue);
    onChange(newChecked);
  };

  return (
    <div role="group" aria-labelledby="label-email">
      <div className="sm:grid sm:grid-cols-4 sm:gap-4 sm:items-baseline">
        <div>
          <div
            className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700"
            id="label-email"
          >
            {title}
          </div>
        </div>
        <div className="mt-4 sm:mt-0 sm:col-span-3">
          <div className="max-w-lg space-y-4">
            {lists.map(({ value, title, description }) => (
              <div key={value} className="relative flex items-start">
                <div className="flex items-center h-5">
                  <input
                    onChange={handleChange}
                    disabled={isDisabled}
                    id={value}
                    name={value}
                    checked={checked.includes(value)}
                    type="checkbox"
                    className={`w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 disabled:text-silver-chalice disabled:animate-pulse`}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor={value} className="font-medium text-gray-700">
                    {title}
                  </label>
                  <p className="text-gray-500">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
