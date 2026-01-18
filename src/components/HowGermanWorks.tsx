import './HowGermanWorks.css';

export function HowGermanWorks() {
  return (
    <article className="hgw-page">
      <header>
        <h1 className="hgw-title">How German Works</h1>
        <p className="hgw-intro">
          A quick overview of what changes in German and why — so you know what you're drilling.
        </p>
      </header>

      {/* ── Section 1: The Problem ── */}
      <section className="hgw-section">
        <div className="hgw-section-header">
          <div className="hgw-dot" />
          <span className="hgw-label">The problem</span>
        </div>
        <p className="hgw-text">
          In English, "the man" is always "the man" regardless of its role in the sentence.
          In German, it changes: <span className="hgw-text-em">der Mann</span> (subject),{' '}
          <span className="hgw-text-em">den Mann</span> (direct object),{' '}
          <span className="hgw-text-em">dem Mann</span> (indirect object).
          These are different <em>cases</em>.
        </p>
        <p className="hgw-text">
          Articles, pronouns, and adjectives all change form depending on context.
          To speak fluently, picking the correct form must be automatic — not something you think about.
          That's what this app drills.
        </p>
      </section>

      {/* ── Section 2: What Changes ── */}
      <section className="hgw-section">
        <div className="hgw-section-header">
          <div className="hgw-dot" />
          <span className="hgw-label">What changes</span>
        </div>
        <p className="hgw-text">
          Four parts of speech change form in German. One more — prepositions — doesn't change form
          itself, but determines the case of what follows.
        </p>
        <div className="hgw-defs">
          <div className="hgw-def">
            <span className="hgw-def-term">Articles</span>
            <span className="hgw-def-example">der / den / dem / des</span>
            <span className="hgw-def-desc">
              Change by case, gender, and number. The main signal for which case you're in.
            </span>
          </div>
          <div className="hgw-def">
            <span className="hgw-def-term">Verbs</span>
            <span className="hgw-def-example">mache / machst / macht / machen</span>
            <span className="hgw-def-desc">
              Change by person and tense (conjugation). Also determine which case their objects take.
            </span>
          </div>
          <div className="hgw-def">
            <span className="hgw-def-term">Pronouns</span>
            <span className="hgw-def-example">ich / mich / mir</span>
            <span className="hgw-def-desc">
              Replace nouns. Change by person, case, and number.
            </span>
          </div>
          <div className="hgw-def">
            <span className="hgw-def-term">Adjectives</span>
            <span className="hgw-def-example">großer / großen / großem</span>
            <span className="hgw-def-desc">
              Endings depend on case, gender, and what article (if any) precedes them.
            </span>
          </div>
          <div className="hgw-def">
            <span className="hgw-def-term">Prepositions</span>
            <span className="hgw-def-example">mit, für, in, auf</span>
            <span className="hgw-def-desc">
              Don't change form, but each one requires a specific case for the noun that follows.
            </span>
          </div>
        </div>
      </section>

      {/* ── Section 3: What Determines the Form ── */}
      <section className="hgw-section">
        <div className="hgw-section-header">
          <div className="hgw-dot" />
          <span className="hgw-label">What determines the form</span>
        </div>
        <p className="hgw-text">
          Five grammatical categories act as inputs. Given the right combination, the correct form
          is always deterministic — there's exactly one right answer.
        </p>
        <div className="hgw-defs">
          <div className="hgw-def">
            <span className="hgw-def-term">Gender (Genus)</span>
            <span className="hgw-def-desc">
              Maskulin, feminin, neutrum. Fixed per noun — der Tisch, die Lampe, das Buch.
              Must be memorized.
            </span>
          </div>
          <div className="hgw-def">
            <span className="hgw-def-term">Case (Kasus)</span>
            <span className="hgw-def-desc">
              Nominativ, Akkusativ, Dativ, Genitiv. Assigned by the verb or preposition — not something you choose.
            </span>
          </div>
          <div className="hgw-def">
            <span className="hgw-def-term">Number (Numerus)</span>
            <span className="hgw-def-desc">
              Singular or plural.
            </span>
          </div>
          <div className="hgw-def">
            <span className="hgw-def-term">Person</span>
            <span className="hgw-def-desc">
              1st (ich/wir), 2nd (du/ihr), 3rd (er/sie/es/sie). Determines verb and pronoun forms.
            </span>
          </div>
          <div className="hgw-def">
            <span className="hgw-def-term">Tense (Tempus)</span>
            <span className="hgw-def-desc">
              Präsens, Präteritum, etc. Affects verb conjugation.
            </span>
          </div>
        </div>
      </section>

      {/* ── Section 4: How Case Works ── */}
      <section className="hgw-section">
        <div className="hgw-section-header">
          <div className="hgw-dot" />
          <span className="hgw-label">How case works</span>
        </div>
        <p className="hgw-text">
          Every noun phrase in a German sentence gets a case. The case is not random — it's
          assigned by the verb or preposition that governs that noun phrase.
        </p>
        <div className="hgw-defs">
          <div className="hgw-def">
            <span className="hgw-def-desc">
              <span className="hgw-text-em">Verbs</span> assign case to their objects.{' '}
              <em>sehen</em> (to see) requires accusative. <em>helfen</em> (to help) requires dative.
              This is fixed per verb.
            </span>
          </div>
          <div className="hgw-def">
            <span className="hgw-def-desc">
              <span className="hgw-text-em">Prepositions</span> assign case to the following noun phrase.{' '}
              <em>mit</em> (with) requires dative. <em>für</em> (for) requires accusative.
              This is fixed per preposition.
            </span>
          </div>
        </div>
        <p className="hgw-text">
          Once the case is assigned, every word in the noun phrase — article, adjective, pronoun —
          takes the form that matches that case + the noun's gender + number.
        </p>

        <p className="hgw-note">Sentence examples with case roles labeled:</p>

        <div className="hgw-diagrams">
          {/* Example 1: ditransitive */}
          <div className="hgw-diagram">
            <div className="hgw-diagram-roles">
              <div className="hgw-diagram-cell">
                <span className="hgw-diagram-role hgw-case-nom">NOM</span>
              </div>
              <div className="hgw-diagram-cell" />
              <div className="hgw-diagram-cell">
                <span className="hgw-diagram-role hgw-case-dat">DAT</span>
              </div>
              <div className="hgw-diagram-cell">
                <span className="hgw-diagram-role hgw-case-akk">AKK</span>
              </div>
            </div>
            <div className="hgw-diagram-words">
              <div className="hgw-diagram-cell">
                <span className="hgw-diagram-word">Ich</span>
              </div>
              <div className="hgw-diagram-cell">
                <span className="hgw-diagram-word hgw-diagram-verb">gebe</span>
              </div>
              <div className="hgw-diagram-cell">
                <span className="hgw-diagram-word">dem Mann</span>
              </div>
              <div className="hgw-diagram-cell">
                <span className="hgw-diagram-word">das Buch</span>
              </div>
            </div>
            <div className="hgw-diagram-translation">
              I give the man the book. — <em>geben</em> assigns DAT (to whom) + AKK (what).
            </div>
          </div>

          {/* Example 2: accusative verb */}
          <div className="hgw-diagram">
            <div className="hgw-diagram-roles">
              <div className="hgw-diagram-cell">
                <span className="hgw-diagram-role hgw-case-nom">NOM</span>
              </div>
              <div className="hgw-diagram-cell" />
              <div className="hgw-diagram-cell">
                <span className="hgw-diagram-role hgw-case-akk">AKK</span>
              </div>
            </div>
            <div className="hgw-diagram-words">
              <div className="hgw-diagram-cell">
                <span className="hgw-diagram-word">Ich</span>
              </div>
              <div className="hgw-diagram-cell">
                <span className="hgw-diagram-word hgw-diagram-verb">sehe</span>
              </div>
              <div className="hgw-diagram-cell">
                <span className="hgw-diagram-word">den Mann</span>
              </div>
            </div>
            <div className="hgw-diagram-translation">
              I see the man. — <em>sehen</em> assigns AKK. der Mann → den Mann.
            </div>
          </div>

          {/* Example 3: preposition */}
          <div className="hgw-diagram">
            <div className="hgw-diagram-roles">
              <div className="hgw-diagram-cell">
                <span className="hgw-diagram-role hgw-case-nom">NOM</span>
              </div>
              <div className="hgw-diagram-cell" />
              <div className="hgw-diagram-cell" />
              <div className="hgw-diagram-cell">
                <span className="hgw-diagram-role hgw-case-dat">DAT</span>
              </div>
            </div>
            <div className="hgw-diagram-words">
              <div className="hgw-diagram-cell">
                <span className="hgw-diagram-word">Ich</span>
              </div>
              <div className="hgw-diagram-cell">
                <span className="hgw-diagram-word hgw-diagram-verb">gehe</span>
              </div>
              <div className="hgw-diagram-cell">
                <span className="hgw-diagram-word hgw-diagram-verb">mit</span>
              </div>
              <div className="hgw-diagram-cell">
                <span className="hgw-diagram-word">dem Mann</span>
              </div>
            </div>
            <div className="hgw-diagram-translation">
              I go with the man. — <em>mit</em> assigns DAT. der Mann → dem Mann.
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 5: How the Groups Connect ── */}
      <section className="hgw-section">
        <div className="hgw-section-header">
          <div className="hgw-dot" />
          <span className="hgw-label">How the groups connect</span>
        </div>
        <p className="hgw-text">
          The practice groups on the dashboard are organized by how the grammar fits together:
        </p>
        <div className="hgw-groups">
          <div className="hgw-group-item">
            <span className="hgw-group-bullet">&gt;</span>
            <span>
              <span className="hgw-group-name">Conjugation</span> — how verbs change form by person
              and tense. Independent of case.
            </span>
          </div>
          <div className="hgw-group-item">
            <span className="hgw-group-bullet">&gt;</span>
            <span>
              <span className="hgw-group-name">Case: Article Forms</span> — what each case looks like.
              Articles carry the main signal.
            </span>
          </div>
          <div className="hgw-group-item">
            <span className="hgw-group-bullet">&gt;</span>
            <span>
              <span className="hgw-group-name">Case: What Triggers It</span> — which verb or
              preposition requires which case.
            </span>
          </div>
          <div className="hgw-group-item">
            <span className="hgw-group-bullet">&gt;</span>
            <span>
              <span className="hgw-group-name">Case: Pronouns & Adjectives</span> — same case
              rules as articles, applied to different word types.
            </span>
          </div>
        </div>
      </section>
    </article>
  );
}
