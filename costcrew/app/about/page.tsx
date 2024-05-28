export default async function About() {
  return (
    <div className="flex-auto max-w-3xl">
      <h3 className="font-bold text-3xl text-center pt-5">
        CostCrew Information
      </h3>
      <h2 className="py-5">
        CostCrew is your go-to solution for hassle-free expense sharing within
        your group. Whether you're splitting bills with roommates, organizing a
        group trip, or simply sharing costs with friends, CostCrew makes it easy
        and efficient.
      </h2>
      <b className="text-xl">With CostCrew, you can:</b>
      <ol>
        <li>
          <b>Track Expenses:</b> Say goodbye to messy spreadsheets or paper
          receipts. CostCrew allows you to effortlessly track shared expenses in
          real-time, right from your smartphone. Simply input the details of
          each expense, and the app will do the rest.
        </li>
        <li>
          <b>Split Costs Fairly:</b> No more headaches trying to calculate who
          owes what. CostCrew automatically divides expenses among participants
          based on customizable criteria, such as equal splits, proportional
          shares, or custom percentages.
        </li>
        <li>
          <b>Settle Debts Seamlessly:</b> Tired of chasing down friends for
          money? CostCrew simplifies the process of settling debts by providing
          easy-to-use payment options directly within the app. Whether it's via
          bank transfer, Venmo, or PayPal, you can settle up with just a few
          taps.
        </li>
        <li>
          <b>Stay Organized:</b> Keep track of all your shared expenses in one
          convenient place. CostCrew provides detailed summaries and reports, so
          you always know who paid for what and who owes whom.
        </li>
      </ol>
      <b className="text-xl">Why should you use CostCrew?</b>
      <ol className="list-decimal py-5">
        <li>
          <b>Convenience:</b> Say goodbye to manual calculations and endless
          text messages. CostCrew automates the entire expense sharing process,
          saving you time and effort.
        </li>
        <li>
          <b>Transparency:</b> With CostCrew, everyone in your group can see
          exactly how expenses are being split, ensuring fairness and
          transparency.
        </li>
        <li>
          <b>Peace of Mind:</b> Never worry about forgetting who owes you money
          or being left out of pocket. CostCrew keeps everything organized and
          accounted for.
        </li>
      </ol>
      So whether you're managing household finances, planning a group vacation,
      or simply going out for dinner with friends, CostCrew is your trusted
      companion for stress-free expense sharing.
    </div>
  );
}
