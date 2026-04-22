import { useEffect, useRef } from 'react'
import { motion, useInView } from 'motion/react'

function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function Section({ id, number, title, children }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.section
      id={id}
      ref={ref}
      className="plan-section"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="plan-section-header">
        <span className="plan-section-num">{number}</span>
        <h2>{title}</h2>
      </div>
      {children}
    </motion.section>
  )
}

function Callout({ type = 'tip', children }) {
  const icons = { good: '✅', warning: '⚠️', critical: '🚨', tip: '💡', bad: '❌' }
  return (
    <div className={`plan-callout plan-callout--${type}`}>
      <span className="plan-callout-icon">{icons[type]}</span>
      <div>{children}</div>
    </div>
  )
}

function Table({ headers, rows }) {
  return (
    <div className="plan-table-wrap">
      <table className="plan-table">
        <thead>
          <tr>{headers.map((h, i) => <th key={i}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const phases = [
  {
    label: 'Phase 1',
    period: 'Apr – Oct 2026',
    color: '#3186FF',
    items: [
      'Register ABN + GST (this week — free & instant)',
      'Save $5,000/month → $30k in 6 months (+$10k = $40k)',
      'Move to Melbourne, rent in Werribee/Wyndham Vale ~$450/wk',
      'Book free mortgage broker consultation',
      'Start Salesforce contract search in Melbourne',
      'Build side income (consulting, coaching, content)',
    ],
  },
  {
    label: 'Phase 2',
    period: 'Oct 2026 – Apr 2027',
    color: '#00B95C',
    items: [
      'Secure Salesforce contract at $1,000–$1,100/day',
      'Save $6,000–$8,000/month with contract income',
      'Get home loan pre-approval (3–6 months contracting history)',
      'Start house hunting in Wyndham Vale ($600–650k target)',
    ],
  },
  {
    label: 'Phase 3',
    period: 'Apr – Oct 2027',
    color: '#FFE432',
    items: [
      'Buy $600–650k house using First Home Guarantee (5% deposit, $0 LMI)',
      'Total cash needed: ~$45,000–$50,000',
      'Move in and start building equity',
    ],
  },
  {
    label: 'Phase 4',
    period: '2028–2036',
    color: '#FC413D',
    items: [
      'Make extra repayments ($500/month extra saves ~$150k interest)',
      'Use offset account to reduce interest',
      'Contracting income grows to $250k–$275k+ over time',
      'Save & invest surplus (ETFs, shares) for Chennai house fund',
      'Apply for Australian citizenship (~2027–2028)',
    ],
  },
  {
    label: 'Phase 5',
    period: '2036–2037',
    color: '#9333EA',
    items: [
      'SELL HOUSE BEFORE LEAVING AUSTRALIA ← critical!',
      'Main residence exemption = $0 capital gains tax',
      'Expected sale ~$874k+ → ~$300k–$350k equity in pocket',
      'Take proceeds to India for Chennai house + retirement fund',
    ],
  },
]

export default function Plan2026Page() {
  useEffect(() => {
    document.title = 'Private Plan 2026 | Property, Finance & Career Guide'

    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex,nofollow'
    document.head.appendChild(meta)

    return () => {
      document.head.removeChild(meta)
    }
  }, [])

  return (
    <div className="plan-page">
      {/* HERO */}
      <header className="plan-hero">
        <div className="plan-hero-inner">
          <motion.div
            className="plan-hero-badge"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            🔒 Private Document
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Your Complete Property, Finance &amp; Career Guide
          </motion.h1>
          <motion.p
            className="plan-hero-sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            April 2026
          </motion.p>
          <motion.div
            className="plan-hero-meta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="plan-meta-row"><span className="plan-meta-label">Prepared for</span><span>Senior Salesforce Developer, PR holder (186 TRT, granted 17 Apr 2026)</span></div>
            <div className="plan-meta-row"><span className="plan-meta-label">Family</span><span>Wife (not working) + 2-year-old daughter | Single income: $150,000/year</span></div>
            <div className="plan-meta-row"><span className="plan-meta-label">Goal</span><span>Buy in western Melbourne (Werribee/Wyndham Vale), live ~10 years, then move to India</span></div>
          </motion.div>
          <motion.div
            className="plan-disclaimer plan-disclaimer--top"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            ⚠️ <strong>Important:</strong> This is general information only — not personal financial, legal, or tax advice. Always consult a qualified mortgage broker, financial adviser, and tax accountant before making decisions.
          </motion.div>

          {/* TOC */}
          <motion.nav
            className="plan-toc"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <p className="plan-toc-title">Jump to section</p>
            <div className="plan-toc-grid">
              {[
                ['#s1', '1. Take-Home Pay'],
                ['#s2', '2. Borrowing Power'],
                ['#s3', '3. Buying Scenarios'],
                ['#s4', '4. VIC First Home Benefits'],
                ['#s5', '5. Monthly Costs'],
                ['#s6', '6. Rent vs Buy 10yr'],
                ['#s7', '7. CGT Warning ⚠️'],
                ['#s8', '8. Werribee vs Wyndham'],
                ['#s9', '9. Salesforce Career'],
                ['#s10', '10. ABN Setup Steps'],
                ['#s11', '11. Earn More Now'],
                ['#s12', '12. 10-Year Action Plan'],
                ['#s13', '13. Risks'],
                ['#s14', '14. Smart Money Moves'],
                ['#s15', '15. Pty Ltd — The Truth'],
                ['#s16', '16. Adelaide vs Melbourne West'],
                ['#s17', '17. Optimal Strategy 🏆'],
              ].map(([href, label]) => (
                <a key={href} href={href} className="plan-toc-link">{label}</a>
              ))}
            </div>
          </motion.nav>
        </div>
      </header>

      <main className="plan-main">

        {/* SECTION 1 */}
        <Section id="s1" number="01" title="Your Take-Home Pay (Confirmed)">
          <FadeIn>
            <p>Using the <strong>2025–26 Australian resident tax brackets</strong> (Stage 3 cuts):</p>
            <Table
              headers={['Bracket', 'Rate', 'Tax on your $150k']}
              rows={[
                ['$0 – $18,200', '0%', '$0'],
                ['$18,201 – $45,000', '16%', '$4,288'],
                ['$45,001 – $135,000', '30%', '$27,000'],
                ['$135,001 – $150,000', '37%', '$5,550'],
                ['Income tax', '', '$36,838'],
                ['Medicare Levy (2%)', '', '$3,000'],
                ['Total tax', '', '$39,838'],
              ]}
            />
            <Callout type="good">
              <strong>Your net take-home pay = $150,000 − $39,838 = ~$110,162/year = ~$9,180/month</strong>
              <br />Your estimate of ~$9,100/month was very close. The precise figure is about <strong>$9,180/month</strong>.
            </Callout>
            <p>Note: Your employer also pays <strong>12% super</strong> on top ($18,000/year into your super fund) — this is not deducted from your salary.</p>
          </FadeIn>
        </Section>

        {/* SECTION 2 */}
        <Section id="s2" number="02" title="Borrowing Power">
          <FadeIn>
            <p>Banks use a "serviceability buffer" — they test whether you can afford repayments at the current rate <strong>plus 3%</strong>. So if the actual rate is 6.0%, they test you at 9.0%.</p>
            <Table
              headers={['Scenario', 'Estimated Max Borrowing', 'Notes']}
              rows={[
                ['Conservative (Big 4 bank)', '$580,000 – $620,000', 'Strict HEM, single income, 2 dependants'],
                ['Moderate (2nd-tier lender)', '$650,000 – $700,000', 'Slightly more flexible on expenses'],
                ['Aggressive (non-bank lender)', '$720,000 – $750,000', 'Lower buffer or more generous income assessment'],
              ]}
            />
            <Callout type="tip">
              With your $150k salary, most mainstream banks will approve roughly <strong>$600k–$650k</strong>. A $650k house with 5% deposit = $617,500 loan — tight but doable with the right lender.
            </Callout>
            <Callout type="good">
              If you move to contracting at ~$1,000–$1,100/day, your annualised income jumps to $220k–$240k, pushing borrowing power above <strong>$900k</strong>. However, most banks want <strong>6–12 months of contracting history</strong> before they'll use that income.
            </Callout>
          </FadeIn>
        </Section>

        {/* SECTION 3 */}
        <Section id="s3" number="03" title="Buying a House — $650K and $700K Scenarios">
          <FadeIn>
            <h3>Current Interest Rates (April 2026)</h3>
            <Callout type="warning">
              <strong>Important update:</strong> The RBA has raised rates twice in 2026 (Feb and March). The cash rate is now <strong>4.10%</strong>. Your assumption of ~5.7% is out of date.
            </Callout>
            <Table
              headers={['Lender type', 'Typical variable rate']}
              rows={[
                ['Big 4 banks (standard variable)', '~6.25% – 6.35%'],
                ['Through a good broker (negotiated)', '~5.80% – 6.00%'],
                ['Online/non-bank lenders (best rates)', '~5.50% – 5.80%'],
              ]}
            />
            <p>Calculations below use <strong>6.0%</strong> (realistic broker-negotiated rate).</p>

            <h3>For a $650,000 house</h3>
            <Table
              headers={['Deposit %', 'Deposit $', 'Loan amount', 'LMI cost', 'Total cash needed']}
              rows={[
                ['5%', '$32,500', '$617,500', '$0 (First Home Guarantee)', '$32,500 + costs'],
                ['10%', '$65,000', '$585,000', '~$8,000 – $12,000', '$65,000 + costs'],
                ['20%', '$130,000', '$520,000', '$0', '$130,000 + costs'],
              ]}
            />

            <h3>For a $700,000 house</h3>
            <Table
              headers={['Deposit %', 'Deposit $', 'Loan amount', 'LMI cost', 'Total cash needed']}
              rows={[
                ['5%', '$35,000', '$665,000', '$0 (First Home Guarantee)', '$35,000 + costs'],
                ['10%', '$70,000', '$630,000', '~$10,000 – $16,000', '$70,000 + costs'],
                ['20%', '$140,000', '$560,000', '$0', '$140,000 + costs'],
              ]}
            />

            <Callout type="good">
              <strong>🎉 The First Home Guarantee — Your Best Friend</strong><br />
              Since October 2025, the scheme has been massively expanded:
              <ul>
                <li><strong>No income caps</strong> (previously $125k single / $200k couple — now removed)</li>
                <li><strong>Unlimited places</strong> (previously capped at 35,000/year)</li>
                <li><strong>Victoria (Melbourne) price cap: $950,000</strong> (your $650–700k house is well within this)</li>
                <li><strong>PR holders are eligible ✅</strong></li>
                <li><strong>5% deposit, ZERO LMI</strong> — the government guarantees the gap to 20%</li>
              </ul>
              You can buy a $650k house with just <strong>$32,500 deposit</strong> and pay <strong>$0 LMI</strong>.
            </Callout>
          </FadeIn>
        </Section>

        {/* SECTION 4 */}
        <Section id="s4" number="04" title="First Home Buyer Benefits in Victoria (2026)">
          <FadeIn>
            <Callout type="bad">
              <strong>FHOG ($10,000 Grant) — BAD NEWS</strong><br />
              The Victorian First Home Owner Grant is <strong>only for NEW homes</strong> (never lived in before). Since you want an existing home, you do <strong>NOT qualify for the $10,000 FHOG</strong>.
            </Callout>
            <Callout type="good">
              <strong>Stamp Duty Concession — GOOD NEWS</strong><br />
              Victoria offers stamp duty relief for first home buyers on <strong>both new and existing homes</strong>.
            </Callout>
            <Table
              headers={['Property value', 'Stamp duty (normal)', 'First home buyer benefit', 'You pay']}
              rows={[
                ['Up to $600,000', '~$31,070', 'Full exemption', '$0'],
                ['$650,000', '~$34,070', 'Partial concession (~67% discount)', '~$11,360'],
                ['$700,000', '~$37,070', 'Partial concession (~33% discount)', '~$24,710'],
                ['$750,000+', 'Varies', 'No first home buyer concession', 'Full rate'],
              ]}
            />
            <Callout type="critical">
              <strong>Key insight:</strong> The jump from $650k to $700k costs you an extra <strong>~$13,350 in stamp duty alone</strong>. Staying under $650k (or ideally $600k) is a significant financial win.
            </Callout>

            <h3>Summary of Upfront Costs</h3>
            <p><strong>Scenario: $650,000 existing house, 5% deposit, First Home Guarantee</strong></p>
            <Table
              headers={['Item', 'Cost']}
              rows={[
                ['Deposit (5%)', '$32,500'],
                ['Stamp duty (first home buyer concession)', '~$11,360'],
                ['Conveyancing/legal fees', '~$1,500 – $2,500'],
                ['Building & pest inspection', '~$500 – $800'],
                ['Loan application/settlement fees', '~$500 – $1,000'],
                ['Moving costs', '~$1,000 – $2,000'],
                ['TOTAL CASH NEEDED', '~$47,500 – $50,000'],
                ['Your current savings', '$10,000'],
                ['Gap to save', '~$37,500 – $40,000'],
              ]}
            />
            <p><strong>Scenario: $700,000 existing house, 5% deposit, First Home Guarantee</strong></p>
            <Table
              headers={['Item', 'Cost']}
              rows={[
                ['Deposit (5%)', '$35,000'],
                ['Stamp duty (first home buyer concession)', '~$24,710'],
                ['Conveyancing/legal fees', '~$1,500 – $2,500'],
                ['Building & pest inspection', '~$500 – $800'],
                ['Other fees', '~$1,500 – $3,000'],
                ['TOTAL CASH NEEDED', '~$63,000 – $66,000'],
                ['Your current savings', '$10,000'],
                ['Gap to save', '~$53,000 – $56,000'],
              ]}
            />
            <Callout type="tip">
              At $650k, you need to save ~$38k more. At $700k, you need ~$54k more. At your current savings rate, this is <strong>8–12 months away</strong> (faster if you switch to contracting).
            </Callout>
          </FadeIn>
        </Section>

        {/* SECTION 5 */}
        <Section id="s5" number="05" title="Monthly Costs — Mortgage vs Renting">
          <FadeIn>
            <h3>Monthly Mortgage Repayments (P&amp;I, 30-year, 6.0% variable)</h3>
            <Table
              headers={['Loan amount', 'Monthly repayment', 'Fortnightly']}
              rows={[
                ['$520,000 (20% deposit on $650k)', '$3,117', '$1,559'],
                ['$585,000 (10% deposit on $650k)', '$3,507', '$1,754'],
                ['$617,500 (5% deposit on $650k)', '$3,702', '$1,851'],
                ['$560,000 (20% deposit on $700k)', '$3,357', '$1,679'],
                ['$630,000 (10% deposit on $700k)', '$3,777', '$1,889'],
                ['$665,000 (5% deposit on $700k)', '$3,987', '$1,994'],
              ]}
            />

            <h3>Total Monthly Housing Costs: Owning vs Renting</h3>
            <p><em>Scenario: $650k house, 5% deposit, $617,500 loan at 6.0%</em></p>
            <Table
              headers={['Cost item', 'Owning (monthly)', 'Renting Werribee/Wyndham (monthly)']}
              rows={[
                ['Mortgage / Rent', '$3,702', '~$1,950 ($450/wk)'],
                ['Council rates', '~$170', '$0'],
                ['Water rates', '~$80', '~$40 (usage only)'],
                ['Home insurance', '~$120', '~$30 (contents only)'],
                ['Maintenance/repairs', '~$200', '$0'],
                ['Total housing', '~$4,270', '~$2,020'],
                ['Bills, groceries, other living', '~$1,200', '~$1,200'],
                ['TOTAL MONTHLY', '~$5,470', '~$3,220'],
              ]}
            />
            <Table
              headers={['', 'Owning', 'Renting']}
              rows={[
                ['Money left after all costs (take-home $9,180)', '~$3,710/month', '~$5,960/month'],
              ]}
            />
            <Callout type="tip">
              Owning costs ~$2,250 more per month than renting. BUT a big chunk of your mortgage payment goes toward <strong>building equity</strong>. After 10 years you'll own a significant portion of the house.
            </Callout>
          </FadeIn>
        </Section>

        {/* SECTION 6 */}
        <Section id="s6" number="06" title="Rent vs Buy — 10-Year Comparison">
          <FadeIn>
            <p className="plan-assumptions">
              <strong>Assumptions:</strong> Property growth 3%/yr · Rent growth 3%/yr · Interest rate 6.0% constant · Income grows $150k → $200k over 10 years · Living expenses +3%/yr
            </p>
            <h3>Scenario A: Keep Renting for 10 Years</h3>
            <Table
              headers={['Year', 'Annual rent ($450/wk, +3%/yr)', 'Cumulative rent paid']}
              rows={[
                ['Year 1', '$23,400', '$23,400'],
                ['Year 5', '$26,340', '~$124,000'],
                ['Year 10', '$30,530', '~$268,000'],
              ]}
            />
            <ul>
              <li><strong>Total rent paid over 10 years: ~$268,000</strong> (all "dead money" — you own nothing)</li>
              <li>If you invest the surplus (~$2,250/month) at 7% return: <strong>~$390,000 in investments after 10 years</strong></li>
            </ul>

            <h3>Scenario B: Buy a $650k House, Live in it 10 Years</h3>
            <Table
              headers={['Item', 'Value']}
              rows={[
                ['House value in 10 years (3% growth)', '~$874,000'],
                ['Loan balance after 10 years (P&I payments)', '~$527,000'],
                ['Your equity (what you own)', '~$347,000'],
                ['Total mortgage payments over 10 years', '~$444,000'],
                ['Total other ownership costs', '~$75,000'],
                ['Total cost of owning over 10 years', '~$519,000'],
                ['Of that, interest + other "dead money"', '~$428,500'],
              ]}
            />
            <p><strong>At year 10, if you sell:</strong> Sale ~$874k − loan ~$527k − selling costs ~$19.5k = <strong>~$327,500 cash in pocket</strong></p>

            <h3>Side-by-Side Summary</h3>
            <Table
              headers={['', 'Rent 10 years', 'Buy $650k']}
              rows={[
                ['Total housing spend', '~$268,000', '~$519,000'],
                ['"Dead money"', '$268,000', '~$428,500'],
                ['Assets at year 10', '~$390,000 (investments)', '~$347,000 (equity) + ~$150,000 (savings)'],
                ['Estimated net wealth', '~$390,000', '~$477,500 – $500,000'],
                ['Flexibility', 'High (can move easily)', 'Lower (tied to property)'],
              ]}
            />
            <Callout type="good">
              <strong>Verdict:</strong> Buying is likely to put you ahead by <strong>~$80,000 – $110,000 over 10 years</strong>, primarily because of property price growth. The renting scenario wins if property prices stagnate or you're very disciplined about investing the difference in shares/ETFs.
            </Callout>
          </FadeIn>
        </Section>

        {/* SECTION 7 — CRITICAL */}
        <Section id="s7" number="07" title="Critical CGT Warning — Non-Resident Selling">
          <FadeIn>
            <Callout type="critical">
              <strong>This is the most important tax issue in your entire plan. Read carefully.</strong>
            </Callout>
            <h3>The Rule (since 1 July 2020)</h3>
            <p><strong>If you are a non-resident of Australia for tax purposes when you sell your property, you CANNOT claim the main residence CGT exemption.</strong> Period. No partial exemption. No apportionment for the years you lived in it.</p>

            <h3>What this means for you</h3>
            <ol>
              <li>You buy a house in 2027, live in it for ~10 years</li>
              <li>You move to India in ~2037 and become a non-resident for Australian tax purposes</li>
              <li>If you sell the house while living in India, you pay <strong>full CGT at non-resident tax rates</strong> (starting at 30%, no tax-free threshold, no 50% CGT discount)</li>
            </ol>
            <Callout type="critical">
              <strong>Example:</strong> Buy for $650,000, sell for $874,000 = $224,000 gain.<br />
              Non-resident tax on $224,000: approximately <strong>$67,200 – $82,880 in tax</strong><br />
              Plus the buyer must withhold <strong>15% of the sale price</strong> ($131,100) and send it to the ATO — you get it back after lodging a tax return, but it's a huge cash flow hit at settlement.
            </Callout>

            <h3>How to avoid this</h3>
            <div className="plan-options">
              <div className="plan-option plan-option--best">
                <span className="plan-option-badge">BEST</span>
                <strong>Option 1:</strong> Sell the house <strong>before you leave Australia</strong>, while you're still a tax resident. You get the <strong>full main residence exemption = $0 CGT</strong>. This alone could save you $70,000–$100,000+.
              </div>
              <div className="plan-option">
                <strong>Option 2:</strong> Come back to Australia temporarily, re-establish tax residency, THEN sell. Complex and requires genuine re-establishment.
              </div>
              <div className="plan-option">
                <strong>Option 3:</strong> Keep the property as a rental. You'll pay CGT eventually, but you keep earning rental income and building equity. Sell later when you might return.
              </div>
            </div>
          </FadeIn>
        </Section>

        {/* SECTION 8 */}
        <Section id="s8" number="08" title="Werribee vs Wyndham Vale — Property Market">
          <FadeIn>
            <h3>Current Prices (March 2026 Quarter, REIV data)</h3>
            <Table
              headers={['Suburb', 'Median house price', 'Quarterly change', 'Weekly rent', 'Rental yield']}
              rows={[
                ['Wyndham Vale', '$601,000', '-2.3%', '~$450', '~3.9%'],
                ['Werribee', '$681,000', 'Stable', '~$460–530', '~3.2–4.0%'],
                ['Tarneit', '$675,000', 'Moderate', '~$470', '~4.1%'],
                ['Mambourin', '$660,000', '+2.3%', '~$460', '~3.6%'],
              ]}
            />
            <Callout type="good">
              <strong>Recommendation:</strong> Wyndham Vale gives you <strong>more house for less money</strong> AND keeps you under $650k which saves ~$13,000 in stamp duty compared to $700k.
            </Callout>

            <h3>Rents: Western Melbourne vs Adelaide</h3>
            <Table
              headers={['Location', 'Typical 3-bed house rent/week', 'Monthly']}
              rows={[
                ['Adelaide (your current area)', '~$600', '~$2,600'],
                ['Wyndham Vale', '~$450', '~$1,950'],
                ['Werribee', '~$480', '~$2,080'],
              ]}
            />
            <Callout type="good">
              Moving to Melbourne's west saves you <strong>~$500–$650/month in rent</strong> — that's $6,000–$7,800/year more you can save toward a deposit.
            </Callout>
          </FadeIn>
        </Section>

        {/* SECTION 9 */}
        <Section id="s9" number="09" title="Salesforce Career — Melbourne Market & Contracting">
          <FadeIn>
            <h3>Full-Time vs Contract Comparison</h3>
            <Table
              headers={['', 'Full-time (current)', 'Contract']}
              rows={[
                ['Gross income', '$150,000 + super', '$220,000 – $264,000 (at $1,000–$1,200/day)'],
                ['Super', 'Employer pays 12% ($18,000)', 'You pay your own (optional but wise)'],
                ['Leave', '4 weeks annual + sick + public holidays', 'No paid leave — no work, no earn'],
                ['Job security', 'Higher', 'Lower (contracts end, gaps between gigs)'],
                ['Tax deductions', 'Limited', 'Many — home office, equipment, training'],
                ['Effective billable days/year', '~230', '~220 (accounting for gaps, holidays)'],
              ]}
            />

            <h3>Realistic Contract Rates (Melbourne, April 2026)</h3>
            <Table
              headers={['Role', 'Daily rate (inc. super)']}
              rows={[
                ['Salesforce Developer (mid-level)', '$800 – $950'],
                ['Senior Salesforce Developer', '$1,000 – $1,200'],
                ['Salesforce Technical Lead / Architect', '$1,200 – $1,500'],
                ['Government contracts (security clearance)', '$1,100 – $1,400'],
              ]}
            />
            <Callout type="good">
              <strong>Your realistic range: $1,000 – $1,100/day</strong> as a senior developer.<br />
              Annual gross at $1,050/day × 220 days = <strong>~$231,000</strong>. After tax + self-funded super, take-home: <strong>~$12,500–$13,000/month</strong> (vs $9,180 now). Extra: <strong>$3,300–$3,800/month</strong>.
            </Callout>

            <h3>Where to Find Contracts</h3>
            <ol>
              <li><strong>Specialist Salesforce recruiters:</strong> Clicks IT, Hudson, Robert Half, Hays, Talent International, DXC</li>
              <li><strong>SEEK (Contract/Temp filter):</strong> Search "Salesforce Developer" → filter by Contract/Temp → Melbourne</li>
              <li><strong>LinkedIn:</strong> Set your headline to "Senior Salesforce Developer | Available for Contract"</li>
              <li><strong>Salesforce Partner ecosystem:</strong> Deloitte Digital, Accenture, Capgemini, PwC</li>
              <li><strong>Government:</strong> Victoria has significant Salesforce deployments (health, education, services)</li>
              <li><strong>Your network:</strong> Melbourne's Salesforce community (meetups, Trailblazer groups)</li>
            </ol>

            <h3>Contracting vs Full-Time Over 10 Years</h3>
            <Table
              headers={['Over 10 years', 'Full-time ($150k → $180k)', 'Contracting ($231k → $275k)']}
              rows={[
                ['Total gross earnings', '~$1.65 million', '~$2.5 million'],
                ['Extra earnings from contracting', '—', '~$850,000'],
                ['After-tax difference', '—', '~$500,000+ more in your pocket'],
              ]}
            />
          </FadeIn>
        </Section>

        {/* SECTION 10 */}
        <Section id="s10" number="10" title="How to Set Up as a Contractor — Step by Step">
          <FadeIn>
            <div className="plan-steps">
              {[
                {
                  step: '1',
                  title: 'Get an ABN — Do This NOW',
                  content: <>
                    As a PR holder, you can register for an ABN immediately. <strong>It's free and takes 10 minutes.</strong>
                    <ol>
                      <li>Go to <strong>abr.gov.au</strong> → "Apply for an ABN"</li>
                      <li>Choose <strong>Sole Trader</strong> (simplest structure)</li>
                      <li>You'll need: your TFN, passport, visa details, residential address</li>
                      <li>Business activity: "Computer system design and related services" (ANZSIC code 7000)</li>
                      <li>You'll get your ABN <strong>instantly online</strong> in most cases</li>
                    </ol>
                  </>
                },
                {
                  step: '2',
                  title: 'Register for GST',
                  content: <>
                    If you expect to earn over $75,000/year (which you will), <strong>you must register for GST</strong>.
                    <ul>
                      <li>Register at the same time as your ABN on the ATO Business Portal</li>
                      <li>Charge clients <strong>10% GST on top of your day rate</strong> (e.g., $1,050 + $105 GST = $1,155/day on your invoice)</li>
                      <li>Collect the GST and pay it to the ATO quarterly (minus GST you paid on business expenses)</li>
                    </ul>
                  </>
                },
                {
                  step: '3',
                  title: 'Set Up Business Banking',
                  content: 'Open a separate business bank account. Keep business and personal money separate — it makes tax time much easier.'
                },
                {
                  step: '4',
                  title: 'Get Insurance',
                  content: <>
                    <ul>
                      <li><strong>Professional Indemnity (PI) Insurance:</strong> Most agencies require this. Cost: ~$500–$1,000/year.</li>
                      <li><strong>Public Liability Insurance:</strong> Usually bundled with PI.</li>
                      <li><strong>Income Protection Insurance:</strong> Highly recommended as a contractor — if you get sick or injured, there's no employer sick leave.</li>
                    </ul>
                  </>
                },
                {
                  step: '5',
                  title: 'Invoicing & Accounting',
                  content: <>
                    <ul>
                      <li>Use <strong>Xero</strong> or <strong>MYOB</strong> for invoicing and bookkeeping (~$30–$50/month)</li>
                      <li>Get a <strong>tax accountant</strong> who understands IT contractors ($300–$600/year)</li>
                      <li>Lodge <strong>BAS (Business Activity Statement)</strong> quarterly for GST</li>
                    </ul>
                  </>
                },
                {
                  step: '6',
                  title: 'Superannuation',
                  content: 'As a sole trader contractor, you\'re not legally required to pay yourself super, but you absolutely should. Contribute at least 12% ($27,720 on $231k). Contributions up to $30,000/year are taxed at just 15% (vs your marginal rate of 30–37%).'
                },
              ].map(({ step, title, content }) => (
                <div className="plan-step" key={step}>
                  <div className="plan-step-num">{step}</div>
                  <div className="plan-step-body">
                    <h3>{title}</h3>
                    <div>{content}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </Section>

        {/* SECTION 11 */}
        <Section id="s11" number="11" title="Earn More Right Now (While Still Employed)">
          <FadeIn>
            <p>You asked: "I'm on a full-time job — until I find a contract, what else can I do?" Here are realistic options for a senior Salesforce developer:</p>
            <div className="plan-cards-grid">
              {[
                { icon: '💼', title: 'Salesforce Consulting (Weekends)', body: 'Reach out to small businesses or Salesforce partners who need overflow work. Even 5–10 hours/week at $100–$150/hour = $2,000–$6,000/month extra. Use your portfolio website and LinkedIn to market this.' },
                { icon: '🎓', title: 'Certification Training / Tutoring', body: 'Coach people preparing for Salesforce certifications (Admin, PD1, PD2). Charge $80–$150/hour. Advertise on LinkedIn, Salesforce Trailblazer Community, and local meetups.' },
                { icon: '📹', title: 'Content Creation', body: 'Write Salesforce technical blogs, create YouTube tutorials, or build Udemy/Teachable courses. A good Salesforce course on Udemy can earn $500–$2,000/month passively over time.' },
                { icon: '📦', title: 'AppExchange Apps', body: 'Build a small Salesforce app (managed package) and list it on AppExchange. Even a niche tool with 50–100 subscribers at $10–$20/month = $500–$2,000/month.' },
                { icon: '🌐', title: 'Toptal / Guru / PeoplePerHour', body: 'Skip Upwork (oversaturated). Try Toptal — they specifically vet senior developers and charge premium rates. Also try Guru.com and PeoplePerHour for Salesforce-specific gigs.' },
                { icon: '🤝', title: 'Partner Subcontracting', body: 'Contact Salesforce consulting partners in Melbourne (Cloud Sherpas, Cloudwerx, Trineo, Simplus) and offer yourself as a subcontractor for specific projects.' },
                { icon: '💰', title: 'Negotiate a Raise NOW', body: 'You just got PR — your employer clearly values you. You can now explore the market freely. Ask for a raise to $170k–$180k, leveraging your PR status and market rates.' },
              ].map(({ icon, title, body }) => (
                <div className="plan-card" key={title}>
                  <span className="plan-card-icon">{icon}</span>
                  <h4>{title}</h4>
                  <p>{body}</p>
                </div>
              ))}
            </div>
            <Callout type="tip">
              <strong>ABN while employed:</strong> There is no conflict with your full-time job in having an ABN. However, check your employment contract for any "moonlighting" or "non-compete" clauses.
            </Callout>
          </FadeIn>
        </Section>

        {/* SECTION 12 */}
        <Section id="s12" number="12" title="Overall Strategy — Your 10-Year Action Plan">
          <FadeIn>
            <div className="plan-phases">
              {phases.map((phase, i) => (
                <motion.div
                  key={phase.label}
                  className="plan-phase"
                  style={{ '--phase-color': phase.color }}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <div className="plan-phase-head">
                    <span className="plan-phase-label" style={{ background: phase.color }}>{phase.label}</span>
                    <span className="plan-phase-period">{phase.period}</span>
                  </div>
                  <ul className="plan-phase-list">
                    {phase.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <h3 style={{ marginTop: '2rem' }}>Money at the End of 10 Years (Buying Scenario)</h3>
            <Table
              headers={['Item', 'Estimated value']}
              rows={[
                ['House sale proceeds (after mortgage payoff)', '~$327,000'],
                ['Cash savings & investments over 10 years', '~$300,000 – $450,000'],
                ['Superannuation (not accessible until age 60)', '~$300,000+'],
                ['Total accessible wealth', '~$627,000 – $777,000'],
              ]}
            />
          </FadeIn>
        </Section>

        {/* SECTION 13 */}
        <Section id="s13" number="13" title="Risks & How to Handle Them">
          <FadeIn>
            <Table
              headers={['Risk', 'Impact', 'How to protect yourself']}
              rows={[
                ['Interest rates rise further', 'Higher repayments', 'Budget at 7.0%+ when deciding; use offset account'],
                ['Property prices fall', 'Negative equity', "Don't overextend; buy well-located property; plan to hold long-term"],
                ['Contract gaps (no work for months)', 'Cash flow stress', 'Keep 3–6 months emergency fund (~$25,000–$30,000)'],
                ["Can't sell before leaving", 'CGT liability', 'Plan your departure 12+ months in advance; list house before leaving'],
                ['AUD weakens against INR', 'Less money when converting', 'Keep some savings in INR-denominated assets; hedge currency risk'],
                ['Relationship/visa changes', 'Various', 'Ensure both names on property title; keep all documentation'],
                ['Maintenance/repair surprises', '$5,000–$20,000 bills', 'Buy newer home (built last 5 years); budget $2,400/year for maintenance'],
              ]}
            />
          </FadeIn>
        </Section>

        {/* SECTION 14 */}
        <Section id="s14" number="14" title="Smart Money Moves">
          <FadeIn>
            <div className="plan-money-moves">
              {[
                { n: '1', title: 'Offset Account', body: 'Keep your savings in an offset account linked to your mortgage. If your mortgage is $617,500 and you have $50,000 in offset, you only pay interest on $567,500. This saves thousands in interest AND your money is still accessible.' },
                { n: '2', title: 'Extra Repayments', body: 'Even $500/month extra on a $617,500 loan at 6% saves ~$150,000 in total interest and cuts ~7 years off your loan. When your income rises from contracting, funnel the extra into the mortgage.' },
                { n: '3', title: 'First Home Super Saver Scheme (FHSSS)', body: 'You can make voluntary super contributions (up to $15,000/year, max $50,000 total) and withdraw them for your first home deposit. The tax benefit: contributions taxed at 15% instead of your marginal rate (30–37%). Potential saving: ~$3,000–$5,000 on a $30,000 contribution.' },
                { n: '4', title: "Don't Buy the Most Expensive House You Can", body: 'Banks will approve you for more than you should borrow. Buy at $600k–$650k, not $700k+. The lower price saves stamp duty AND gives you breathing room.' },
                { n: '5', title: 'Keep Your Indian Bank Accounts Active', body: 'When you eventually transfer money to India, having existing NRE/NRO accounts makes the process smoother and you can take advantage of favourable exchange rate windows.' },
              ].map(({ n, title, body }) => (
                <div className="plan-money-move" key={n}>
                  <div className="plan-money-move-num">{n}</div>
                  <div>
                    <h4>{title}</h4>
                    <p>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </Section>

        {/* ── ADDITION: PTY LTD + ADELAIDE ANALYSIS ── */}

        {/* SECTION 15 */}
        <Section id="s15" number="15" title="Does a Pty Ltd Help You Buy a Home?">
          <FadeIn>
            <Callout type="critical">
              <strong>Short answer: NO — it actually makes it HARDER.</strong>
            </Callout>

            <h3>1. You lose ALL first home buyer benefits</h3>
            <p>The FHOG and stamp duty concessions are only available to <strong>individuals</strong>, not companies. If you buy through a Pty Ltd, you lose ALL first home buyer benefits — that's up to $50,000+ in SA you'd throw away.</p>

            <h3>2. No main residence CGT exemption for a company</h3>
            <p>If a Pty Ltd owns the house, there is <strong>no main residence exemption</strong>. When you sell, the company pays CGT on the entire capital gain. As an individual, you live in the house and sell it CGT-free. This could be a $70,000–$100,000+ difference.</p>

            <h3>3. Banks treat company borrowers differently</h3>
            <p>Most lenders won't give a standard home loan to a Pty Ltd for a residential property. You'd need a commercial loan — higher interest rates (often 1–2% more), larger deposits (usually 20–30% minimum), and fewer features (no offset account, limited extra repayments).</p>

            <h3>4. Stamp duty is often HIGHER for company purchases</h3>
            <p>In Victoria, companies purchasing residential property don't get the principal place of residence concession. In SA, no first home buyer stamp duty relief for companies.</p>

            <h3>5. PSI rules mean no tax advantage anyway</h3>
            <p>Your contracting income is Personal Services Income. Even if you earn through a Pty Ltd, it's taxed at your personal rate. There's no pool of "company money" to use for a deposit at a lower tax rate.</p>

            <Callout type="good">
              <strong>The verdict: Buy the home in YOUR NAME (personally), not through a company.</strong> This is the only way to access:
              <ul>
                <li>First Home Owner Grant ($15,000 SA / $10,000 VIC for new homes)</li>
                <li>Stamp duty exemptions (up to $30,000+ in SA for new homes)</li>
                <li>First Home Guarantee (5% deposit, $0 LMI)</li>
                <li>Main residence CGT exemption (sell tax-free)</li>
                <li>Standard home loan rates (~6.0% instead of ~7.5%+ commercial)</li>
              </ul>
            </Callout>
          </FadeIn>
        </Section>

        {/* SECTION 16 */}
        <Section id="s16" number="16" title="Adelaide vs Wyndham Vale/Werribee — The Big Comparison">
          <FadeIn>
            <Callout type="tip">
              Buying a <strong>new home</strong> (house &amp; land package or newly built, never lived in) changes everything — especially because of Adelaide's incredible first home buyer benefits for new homes.
            </Callout>

            <h3>First Home Buyer Benefits — Side by Side</h3>
            <Table
              headers={['Benefit', 'Adelaide (SA) — NEW HOME', 'Wyndham Vale/Werribee (VIC) — NEW HOME', 'VIC — EXISTING HOME']}
              rows={[
                ['FHOG cash grant', '$15,000 ✅', '$10,000 (if under $750k, never occupied)', '$0 ❌'],
                ['Stamp duty', '$0 (abolished for ALL new homes, no price cap) ✅', '$0 if under $600k; partial if $600–750k', '$0 if under $600k; ~$11k at $650k'],
                ['First Home Guarantee', 'Yes — 5% deposit, $0 LMI (cap $900k)', 'Yes — 5% deposit, $0 LMI (cap $950k)', 'Yes — same'],
                ['Total benefit on $600k new home', '~$40,000–$45,000', '~$10,000–$31,000', '~$0–$31,000'],
              ]}
            />
            <Callout type="good">
              <strong>Adelaide's advantage for new homes is massive: ~$15,000–$30,000 more in benefits than Victoria.</strong> SA gives you $15,000 FHOG AND $0 stamp duty on new homes at any price, while VIC's FHOG is only $10,000 and the stamp duty concession phases out above $600k.
            </Callout>

            <h3>House &amp; Land Package Prices by Location</h3>
            <Table
              headers={['Location', 'Typical H&L price', 'What you get']}
              rows={[
                ['Adelaide North (Playford, Munno Para, Angle Vale)', '$450,000 – $580,000', '3–4 bed, new estate, smaller lot'],
                ['Adelaide North (Gawler, Two Wells, Riverlea)', '$520,000 – $650,000', '3–4 bed, larger lot, newer estates'],
                ['Adelaide Outer South (Seaford, Aldinga)', '$500,000 – $650,000', '3–4 bed, near beach corridor'],
                ['Wyndham Vale / Werribee (VIC)', '$550,000 – $700,000', '3–4 bed, new estates'],
                ['Tarneit / Truganina (VIC)', '$580,000 – $750,000', '3–4 bed, newer estates'],
              ]}
            />
            <p><strong>Adelaide is $50,000–$100,000 cheaper</strong> for comparable new homes, AND you get $15,000–$30,000 more in government benefits.</p>

            <h3>Total Upfront Cost — $580,000 New H&L Package</h3>
            <Table
              headers={['Item', 'Adelaide (SA)', 'Wyndham Vale (VIC)']}
              rows={[
                ['Purchase price', '$580,000', '$580,000'],
                ['Deposit (5%, First Home Guarantee)', '$29,000', '$29,000'],
                ['FHOG grant (reduces cash needed)', '−$15,000', '−$10,000 (new only)'],
                ['Stamp duty', '$0', '$0 (under $600k exemption)'],
                ['Conveyancing/legal', '~$1,500', '~$2,000'],
                ['Building inspection', '~$500', '~$500'],
                ['Other fees', '~$1,500', '~$1,500'],
                ['TOTAL CASH NEEDED', '~$17,500', '~$23,000'],
                ['Your savings', '$10,000', '$10,000'],
                ['Gap to save', '~$7,500', '~$13,000'],
              ]}
            />
            <Callout type="good">
              With Adelaide's $15,000 FHOG and $0 stamp duty, you could buy a new home with <strong>just $17,500 total cash</strong> — only ~$7,500 more to save. That's 1–2 months of aggressive saving.
            </Callout>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h3>10-Year Growth Projection — Which City Wins?</h3>
            <Table
              headers={['Metric', 'Adelaide', 'Melbourne (outer west)']}
              rows={[
                ['5-year dwelling growth', '~80%', '~15–25%'],
                ['Annual growth (2025)', '~11–14%', '~1–3%'],
                ['2026 forecast (major banks)', '6–9%', '-1.7% to +3%'],
                ['2027 forecast', '~3–5% (slowing)', '+2.9% (recovering)'],
              ]}
            />
            <Callout type="tip">
              Adelaide's "catch-up" phase is ending — median dwelling value is already $937,000 (March 2026). Melbourne is forecast to <strong>lead the recovery from 2027</strong>; the historically wide price gap vs Sydney tends to correct over time.
            </Callout>

            <p><strong>$580,000 purchase in Adelaide (new H&L)</strong></p>
            <Table
              headers={['Growth rate', 'Value in 10 years', 'Equity gained']}
              rows={[
                ['Conservative (4%/yr)', '$858,000', '$278,000'],
                ['Moderate (5%/yr)', '$945,000', '$365,000'],
                ['Optimistic (6%/yr)', '$1,039,000', '$459,000'],
              ]}
            />
            <p><strong>$580,000 purchase in Wyndham Vale (new H&L)</strong></p>
            <Table
              headers={['Growth rate', 'Value in 10 years', 'Equity gained']}
              rows={[
                ['Conservative (3%/yr)', '$779,000', '$199,000'],
                ['Moderate (4%/yr)', '$858,000', '$278,000'],
                ['Optimistic (5%/yr)', '$945,000', '$365,000'],
              ]}
            />

            <h3>Rental Yield Comparison</h3>
            <Table
              headers={['Location', 'Weekly rent', 'Gross yield', 'Rent in 10 years (3% growth)']}
              rows={[
                ['Adelaide (northern, new 3-bed)', '~$500–550/wk', '~4.5–5.0%', '~$670–740/wk'],
                ['Wyndham Vale (3-bed house)', '~$450/wk', '~3.9%', '~$605/wk'],
                ['Werribee (3-bed house)', '~$480–530/wk', '~3.5–4.0%', '~$645–710/wk'],
              ]}
            />
            <Callout type="good">
              Adelaide currently delivers <strong>higher rental yields</strong> — meaning the rent covers more of your mortgage if you keep it as an investment.
            </Callout>
          </FadeIn>

          <FadeIn delay={0.15}>
            <h3>Complete Financial Comparison (New Home, $580k, 5% deposit)</h3>
            <Table
              headers={['Factor', 'Adelaide (SA)', 'Wyndham Vale (VIC)']}
              rows={[
                ['Purchase price', '$580,000', '$580,000'],
                ['FHOG', '$15,000', '$10,000'],
                ['Stamp duty', '$0', '$0'],
                ['Cash needed to buy', '~$17,500', '~$23,000'],
                ['Loan amount', '$536,000', '$541,000'],
                ['Monthly repayment (6%, 30yr)', '$3,213', '$3,243'],
                ['Weekly rent if renting instead', '~$530 ($2,297/mo)', '~$450 ($1,950/mo)'],
                ['Estimated value in 10 years', '$858,000–$945,000', '$779,000–$858,000'],
                ['Equity after 10 years', '~$340,000–$430,000', '~$260,000–$340,000'],
                ['Rental income in 10 years', '~$670–740/wk', '~$605/wk'],
                ['Rental yield', 'Higher (4.5–5%)', 'Lower (3.5–4%)'],
              ]}
            />

            <h3>Non-Financial Factors</h3>
            <Table
              headers={['Factor', 'Adelaide', 'Melbourne West']}
              rows={[
                ['Where you currently live', '✅ Already here', 'Need to relocate'],
                ['Salesforce job market', 'Smaller, fewer contracts', '✅ Much larger, more contracts'],
                ['Contract rates', '~$900–$1,000/day', '✅ ~$1,000–$1,200/day'],
                ['Family/community', 'Already established', 'Need to rebuild'],
                ['Cost of living', 'Slightly lower', 'Slightly higher'],
                ['Rents (while saving)', '$530–600/wk (3-bed)', '$420–480/wk (3-bed)'],
                ['Long-term growth outlook', '✅ Stronger near-term', '✅ Stronger recovery potential'],
              ]}
            />
          </FadeIn>
        </Section>

        {/* SECTION 17 */}
        <Section id="s17" number="17" title="The Optimal Strategy — Recommendation 🏆">
          <FadeIn>
            <Callout type="good">
              <strong>Adelaide NEW HOME wins on almost every financial metric:</strong>
              <ol style={{marginTop:'0.5rem'}}>
                <li><strong>$15,000 more in grants</strong> ($15k FHOG vs $10k in VIC)</li>
                <li><strong>$0 stamp duty</strong> with no price cap (VIC phases out above $600k)</li>
                <li><strong>$50–100k cheaper</strong> for equivalent new homes</li>
                <li><strong>Higher rental yields</strong> (4.5–5% vs 3.5–4%)</li>
                <li><strong>Stronger recent growth</strong> and more momentum</li>
                <li><strong>You're already there</strong> — no moving costs, no disruption</li>
                <li><strong>Buy SOONER</strong> — only ~$7,500 more to save vs ~$13,000+ for VIC</li>
              </ol>
            </Callout>

            <Callout type="warning">
              <strong>BUT — there's a catch:</strong> Melbourne offers <strong>$100–$200/day more</strong> in Salesforce contracting rates. Over 10 years, that's <strong>$220,000–$440,000 extra income</strong>.
            </Callout>

            <h3>The OPTIMAL Path — Buy Adelaide, Then Melbourne</h3>
            <div className="plan-steps">
              {[
                { step: '1', title: 'Right Now — Stay in Adelaide, Save Hard', content: 'Stay in Adelaide, save aggressively for 2–3 months. Target $5,000/month savings.' },
                { step: '2', title: 'Mid 2026 — Buy in Adelaide North', content: 'Buy a $500–580k H&L package in Adelaide\'s north (Playford, Munno Para, Angle Vale). You need just ~$17,500 cash. Use FHOG ($15k) + First Home Guarantee (5% deposit, $0 LMI) + $0 stamp duty.' },
                { step: '3', title: '12 Months — Live in the House', content: 'Live in it for 12 months (required for FHOG and stamp duty exemption).' },
                { step: '4', title: 'Mid 2027 — Move to Melbourne for Contracts', content: 'Move to Melbourne for higher-paying contract work ($1,000–$1,200/day). Rent in Melbourne ($450–500/wk) while renting out your Adelaide house (~$500–550/wk).' },
                { step: '5', title: 'Years 2–10 — Housing Cost Neutral', content: 'Your Adelaide rent almost covers your Melbourne rent — effectively housing cost neutral. Pay the Adelaide mortgage from your higher Melbourne contract income.' },
                { step: '6', title: 'Year 10 — Sell Before Leaving Australia', content: 'Sell the Adelaide house while still a tax resident → $0 CGT under main residence exemption (6-year absence rule applies since you won\'t own another property).' },
              ].map(({ step, title, content }) => (
                <div className="plan-step" key={step}>
                  <div className="plan-step-num">{step}</div>
                  <div className="plan-step-body">
                    <h3>{title}</h3>
                    <p style={{margin:0}}>{content}</p>
                  </div>
                </div>
              ))}
            </div>

            <h3 style={{marginTop:'2rem'}}>10-Year Financial Outcome (This Strategy)</h3>
            <Table
              headers={['Item', 'Estimated value']}
              rows={[
                ['Adelaide house value in 10 years (5% growth)', '~$945,000'],
                ['Mortgage balance remaining', '~$460,000'],
                ['Equity', '~$485,000'],
                ['Net rental income over ~8 years', '~$50,000–$80,000'],
                ['Extra Melbourne contract income (vs staying in Adelaide)', '~$300,000+'],
                ['Savings & investments from higher income', '~$200,000–$400,000'],
                ['Total accessible wealth at year 10', '~$700,000–$965,000'],
              ]}
            />

            <Callout type="critical">
              <strong>The 6-Year Absence Rule — Critical Timing</strong><br />
              Live in Adelaide house: <strong>2027–2028</strong> (12+ months) → Rent it out: <strong>2028–2034</strong> (6 years max) → <strong>Sell by 2034</strong> while still an Australian tax resident = <strong>$0 CGT</strong>.<br /><br />
              If you're away for MORE than 6 years AND become a non-resident, you lose the exemption. Plan your departure accordingly. Since you'll be renting in Melbourne (not owning), this works perfectly.
            </Callout>
          </FadeIn>
        </Section>

        {/* ── END ADDITION ── */}

        {/* NEXT STEPS CTA */}
        <FadeIn>
          <div className="plan-cta">
            <h2>Updated Next 3 Steps — Do This Month</h2>
            <p className="plan-cta-sub">April 2026 — Adelaide-first strategy</p>
            <div className="plan-cta-steps">
              <div className="plan-cta-step">
                <div className="plan-cta-step-num">1</div>
                <div>
                  <h3>Register Your ABN This Week</h3>
                  <p>Go to <strong>abr.gov.au</strong> → Apply as a sole trader + register for GST. Cost: $0, takes 15 minutes. This lets you start side consulting immediately and prepares you for contract work.</p>
                </div>
              </div>
              <div className="plan-cta-step">
                <div className="plan-cta-step-num">2</div>
                <div>
                  <h3>Talk to a Mortgage Broker in Adelaide</h3>
                  <p>This week — free consultation. Find a broker who specialises in first home buyers and H&L packages. Ask specifically about: <strong>FHOG $15k + $0 stamp duty + First Home Guarantee (5% deposit, $0 LMI)</strong>. They'll tell you your exact buying power and how soon you can buy.</p>
                </div>
              </div>
              <div className="plan-cta-step">
                <div className="plan-cta-step-num">3</div>
                <div>
                  <h3>Research H&L Packages in Adelaide's North</h3>
                  <p>Next 2–3 months. Save aggressively ($5,000/month target). Research H&L packages in <strong>Playford, Munno Para, Angle Vale, Two Wells</strong> in the $500–580k range. You could be buying within 3 months with just ~$17,500 total cash needed.</p>
                </div>
              </div>
            </div>
            <div className="plan-cta-closing">
              <strong>Bottom line:</strong> Adelaide's new home benefits are the best in Australia right now for first home buyers. $15,000 grant + $0 stamp duty + 5% deposit with no LMI = you can buy sooner, cheaper, and with more upside than Melbourne's west. Buy in Adelaide, live there 12 months, then move to Melbourne for the higher contract income. Best of both worlds. <strong>You've got this. 💪</strong>
            </div>
          </div>
        </FadeIn>

      </main>

      <footer className="plan-footer">
        <p><em>This guide was prepared using publicly available data as of April 2026. Property prices, interest rates, tax rules, and government schemes can change. Always verify current information with qualified professionals before making financial decisions.</em></p>
        <p className="plan-footer-private">🔒 This page is private and not indexed by search engines.</p>
      </footer>
    </div>
  )
}
