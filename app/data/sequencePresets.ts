// app/data/sequencePresets.ts
// Reusable preset library and schema definitions for Interactive Sequence Diagram Widgets

export type MessageType = "sync" | "response" | "self" | "async";

export interface SequenceActor {
  id: string;
  label: string;
  sublabel?: string;
  badge?: string;
}

export interface SequenceStep {
  id?: string;
  title: string;
  description: string;
  from: string; // actor id
  to: string; // actor id
  label: string; // message text shown above or beside the arrow
  type?: MessageType; // 'sync' (solid arrow), 'response' (dashed arrow), 'self' (loopback)
  payload?: string | Record<string, any>;
  payloadLanguage?: string;
  highlightActors?: string[];
}

export interface SequenceSpec {
  id?: string;
  preset?: string;
  title?: string;
  caption?: string;
  actors: SequenceActor[];
  steps: SequenceStep[];
  autoPlayIntervalMs?: number;
}

export const LLM_TOOL_CALLING_PRESET: SequenceSpec = {
  id: "llm-tool-calling",
  preset: "llm-tool-calling",
  title: "LLM Tool Calling Lifecycle",
  caption: "Step-by-step execution flow of function calling and tool execution in autonomous agents",
  autoPlayIntervalMs: 4000,
  actors: [
    { id: "sdk", label: "SDK", sublabel: "Orchestration Client" },
    { id: "llm", label: "LLM", sublabel: "Foundation Model" },
    { id: "tools", label: "Tools", sublabel: "Execution Dispatcher" },
    { id: "read_sql", label: "read_sql", sublabel: "Database Worker" },
  ],
  steps: [
    {
      id: "step-1",
      title: "SDK Provides Tool Schemas",
      from: "sdk",
      to: "llm",
      label: "tool schemas",
      type: "sync",
      description:
        "Before every LLM call, the SDK binds the available tools to the model call. The model receives each tool name, description, and JSON schema, so it knows what tools exist and how to call them.",
      payloadLanguage: "json",
      payload: {
        tools: [
          {
            type: "function",
            function: {
              name: "read_sql",
              description: "Execute a read-only SQL query against the analytics database",
              parameters: {
                type: "object",
                properties: {
                  query: {
                    type: "string",
                    description: "The SQL SELECT statement to execute",
                  },
                },
                required: ["query"],
              },
            },
          },
        ],
      },
    },
    {
      id: "step-2",
      title: "User Prompt Ingested",
      from: "sdk",
      to: "llm",
      label: "user query + system prompt",
      type: "sync",
      description:
        "The SDK transmits the user query alongside runtime instructions and conversation history. The LLM processes the objective against its instructions and registered tool capabilities.",
      payloadLanguage: "json",
      payload: {
        messages: [
          {
            role: "system",
            content: "You are an analytical assistant with direct read access to PostgreSQL.",
          },
          {
            role: "user",
            content: "Find the top 5 students enrolled in Python cohorts with grades above 90%.",
          },
        ],
      },
    },
    {
      id: "step-3",
      title: "Model Reasons and Selects Tool",
      from: "llm",
      to: "llm",
      label: "reasoning & argument synthesis",
      type: "self",
      description:
        "The model analyzes the prompt and realizes it lacks real-time database rows. Rather than hallucinating values, it selects the read_sql schema and formulates valid SQL query arguments conforming to the declared schema.",
      payloadLanguage: "sql",
      payload:
        "SELECT name, score, batch \nFROM student_records \nWHERE course = 'Python Masterclass' AND score > 90 \nORDER BY score DESC \nLIMIT 5;",
    },
    {
      id: "step-4",
      title: "Structured Tool Call Emitted",
      from: "llm",
      to: "sdk",
      label: "tool_call: read_sql(query)",
      type: "response",
      description:
        "The model halts natural language generation and emits a structured tool_call event. It specifies read_sql as the target function and packages the generated SQL arguments into a JSON payload.",
      payloadLanguage: "json",
      payload: {
        id: "call_982bca10",
        type: "function",
        function: {
          name: "read_sql",
          arguments: {
            query:
              "SELECT name, score, batch FROM student_records WHERE course = 'Python Masterclass' AND score > 90 ORDER BY score DESC LIMIT 5;",
          },
        },
      },
    },
    {
      id: "step-5",
      title: "SDK Dispatches to Tool Registry",
      from: "sdk",
      to: "tools",
      label: "dispatch execution",
      type: "sync",
      description:
        "The SDK intercepts the structured tool call, verifies security sandboxing policies (e.g. read-only statement validation and query timeout), and dispatches the execution request to the tool runner.",
      payloadLanguage: "json",
      payload: {
        action: "execute_tool",
        handler: "read_sql",
        sandboxed: true,
        timeoutMs: 5000,
      },
    },
    {
      id: "step-6",
      title: "Tool Executes SQL Query",
      from: "tools",
      to: "read_sql",
      label: "execute read_sql",
      type: "sync",
      description:
        "The read_sql worker connects to the read-replica database, executes the parameterized query, and serializes the resulting records into structured rows.",
      payloadLanguage: "json",
      payload: {
        rowsAffected: 3,
        executionTimeMs: 14.2,
      },
    },
    {
      id: "step-7",
      title: "Results Returned to LLM Context",
      from: "read_sql",
      to: "sdk",
      label: "tabular results -> observation",
      type: "response",
      description:
        "The database returns the raw records to the SDK. The SDK packages them into a tool observation message and feeds it back into the model context, allowing the LLM to synthesize the final verified answer.",
      payloadLanguage: "json",
      payload: {
        role: "tool",
        tool_call_id: "call_982bca10",
        content: [
          { name: "Sentila Ao", score: 98, batch: "Batch-2026-A" },
          { name: "Kevisezo Angami", score: 96, batch: "Batch-2026-A" },
          { name: "Imli Jamir", score: 94, batch: "Batch-2026-B" },
        ],
      },
    },
  ],
};

export const RAG_PIPELINE_PRESET: SequenceSpec = {
  id: "rag-pipeline",
  preset: "rag-pipeline",
  title: "Retrieval-Augmented Generation Pipeline",
  caption: "End-to-end vector retrieval, reranking, and grounded response generation",
  autoPlayIntervalMs: 4000,
  actors: [
    { id: "user", label: "Client", sublabel: "Web App" },
    { id: "retriever", label: "Retriever", sublabel: "Vector Store" },
    { id: "reranker", label: "Reranker", sublabel: "Cross-Encoder" },
    { id: "llm", label: "LLM", sublabel: "Generator" },
  ],
  steps: [
    {
      title: "Query Embedding & Search",
      from: "user",
      to: "retriever",
      label: "query embedding vector",
      type: "sync",
      description: "The user query is converted into a high-dimensional vector and dispatched to the vector database for nearest-neighbor similarity search.",
    },
    {
      title: "Top-K Candidates Retrieved",
      from: "retriever",
      to: "reranker",
      label: "top 25 document chunks",
      type: "sync",
      description: "The vector database returns candidate text chunks with approximate cosine distance matches to the reranking stage.",
    },
    {
      title: "Cross-Encoder Reranking",
      from: "reranker",
      to: "reranker",
      label: "cross-attention scoring",
      type: "self",
      description: "The cross-encoder evaluates bidirectional token interaction between the query and each chunk, filtering noise and reordering chunks by true relevance.",
    },
    {
      title: "Top Context Injected to Prompt",
      from: "reranker",
      to: "llm",
      label: "top 3 context chunks + prompt",
      type: "sync",
      description: "The highest-scoring passages are assembled into an augmented prompt with strict grounding constraints.",
    },
    {
      title: "Grounded Answer Generated",
      from: "llm",
      to: "user",
      label: "verified citation response",
      type: "response",
      description: "The LLM synthesizes an accurate answer citing the retrieved source passages, eliminating hallucinations.",
    },
  ],
};

export const AUTONOMOUS_REACT_AGENT_PRESET: SequenceSpec = {
  id: "autonomous-agent-react",
  preset: "autonomous-agent-react",
  title: "Autonomous ReAct Loop & Self-Healing Execution",
  caption: "Dynamic Reason -> Act -> Observe cycle with sandboxed tool execution and autonomous error recovery",
  autoPlayIntervalMs: 4000,
  actors: [
    { id: "orchestrator", label: "Orchestrator", sublabel: "State Machine" },
    { id: "llm_core", label: "LLM Core", sublabel: "Reasoning Engine" },
    { id: "tool_router", label: "Tool Router", sublabel: "Schema Validation" },
    { id: "sandbox", label: "Sandbox", sublabel: "Docker / Browser" },
  ],
  steps: [
    {
      id: "step-1",
      title: "Orchestrator Binds Tool Schemas",
      from: "orchestrator",
      to: "llm_core",
      label: "bind tools (pydantic/zod)",
      type: "sync",
      description:
        "Before executing the ReAct loop, the orchestrator compiles available programmatic tools into strict Pydantic and Zod schemas, binding system state, file system boundaries, and past conversation memory to the model call.",
      payloadLanguage: "json",
      payload: {
        workspace: "/workspace/repo-sandbox",
        tools: [
          {
            name: "docker_exec",
            description: "Run shell command inside isolated Docker container",
            parameters: {
              type: "object",
              properties: {
                command: { type: "string", description: "Bash command line to execute" },
                timeout_seconds: { type: "number", default: 30 }
              },
              required: ["command"]
            }
          }
        ]
      },
    },
    {
      id: "step-2",
      title: "Reason: Hypothesis & Action Plan",
      from: "llm_core",
      to: "llm_core",
      label: "reason: plan test & patch",
      type: "self",
      description:
        "In the Reason phase, the model assesses its objective, reviews short-term memory, and analyzes the bug report. Rather than hallucinating a blind fix, it reasons that it must first run a reproduction test inside the sandbox.",
      payloadLanguage: "json",
      payload: {
        thought: "The issue describes a token expiration failure in the auth router. I need to run pytest inside the container to observe the exact failure trace before making edits.",
        selected_tool: "docker_exec",
        confidence: 0.94
      },
    },
    {
      id: "step-3",
      title: "Act: Emit Structured Tool Call",
      from: "llm_core",
      to: "orchestrator",
      label: "tool_call: docker_exec(pytest)",
      type: "response",
      description:
        "The model halts token generation and yields a structured tool_call event for docker_exec. The orchestrator intercepts the call to validate arguments against schema guardrails and security policies.",
      payloadLanguage: "json",
      payload: {
        tool_calls: [
          {
            id: "call_sandbox_9921",
            type: "function",
            function: {
              name: "docker_exec",
              arguments: "{\"command\": \"pytest tests/test_auth.py -k test_refresh_token\"}"
            }
          }
        ]
      },
    },
    {
      id: "step-4",
      title: "Dispatch to Isolated Docker Sandbox",
      from: "orchestrator",
      to: "sandbox",
      label: "execute in isolated container",
      type: "sync",
      description:
        "The tool router validates parameters against Zod schemas and executes the test command inside an isolated Docker container, shielding the host system from non-deterministic scripts.",
      payloadLanguage: "json",
      payload: {
        container_id: "docker_worker_a7",
        command: "pytest tests/test_auth.py -k test_refresh_token",
        network: "isolated",
        cpu_limit: "2.0"
      },
    },
    {
      id: "step-5",
      title: "Observe: Ingest Traceback & Error",
      from: "sandbox",
      to: "orchestrator",
      label: "exit code 1: AssertionError",
      type: "response",
      description:
        "The container test execution fails with an AssertionError and traceback. Instead of crashing the entire workflow like a rigid script, the agent captures stdout and exit status as an observation event.",
      payloadLanguage: "json",
      payload: {
        exit_code: 1,
        stdout: "FAILED tests/test_auth.py::test_refresh_token - AssertionError: Expected status 200 but received 401 Unauthorized at auth/tokens.py:42"
      },
    },
    {
      id: "step-6",
      title: "Self-Correction: Revise Plan & Patch",
      from: "orchestrator",
      to: "llm_core",
      label: "observation -> revise & patch",
      type: "sync",
      description:
        "The orchestrator routes the failure trace back into the model context. The LLM parses the stack trace, revises its hypothesis, and generates a concrete code patch to resolve the invalid timestamp comparison.",
      payloadLanguage: "json",
      payload: {
        error_analysis: "Token expiration check compares UTC timestamp against local server time.",
        diff_patch: "- if token.expires_at < datetime.now():\n+ if token.expires_at < datetime.now(timezone.utc):",
        action: "write_patch"
      },
    },
    {
      id: "step-7",
      title: "Verified Resolution: Test Suite Green",
      from: "llm_core",
      to: "sandbox",
      label: "apply patch & verify tests pass",
      type: "sync",
      description:
        "The agent applies the source patch and re-runs the container test suite. With all tests passing green, the agent completes the ReAct loop, summarizes the root cause fix, and prepares a verified Pull Request.",
      payloadLanguage: "json",
      payload: {
        test_status: "PASSED (14 passed, 0 failed in 1.48s)",
        pull_request: {
          title: "fix: unify UTC timestamp verification in token refresher",
          branch: "fix/auth-token-utc",
          status: "ready_to_merge"
        }
      },
    },
  ],
};

export const SEQUENCE_PRESETS: Record<string, SequenceSpec> = {
  "autonomous-agent-react": AUTONOMOUS_REACT_AGENT_PRESET,
  "autonomous-react-agent": AUTONOMOUS_REACT_AGENT_PRESET,
  "react-agent-loop": AUTONOMOUS_REACT_AGENT_PRESET,
  "building-autonomous-ai-agents": AUTONOMOUS_REACT_AGENT_PRESET,
  "llm-tool-calling": LLM_TOOL_CALLING_PRESET,
  "agent-tool-calling": LLM_TOOL_CALLING_PRESET,
  "rag-pipeline": RAG_PIPELINE_PRESET,
};

export function resolveSequenceSpec(rawSpec?: any): SequenceSpec {
  if (!rawSpec) {
    return LLM_TOOL_CALLING_PRESET;
  }

  // If a preset is specified by string
  const presetKey = rawSpec.preset || rawSpec.id;
  const basePreset = (presetKey && SEQUENCE_PRESETS[presetKey]) ? SEQUENCE_PRESETS[presetKey] : LLM_TOOL_CALLING_PRESET;

  // If actors and steps are explicitly provided, use them; otherwise fall back to preset
  const actors = Array.isArray(rawSpec.actors) && rawSpec.actors.length > 0 ? rawSpec.actors : basePreset.actors;
  const steps = Array.isArray(rawSpec.steps) && rawSpec.steps.length > 0 ? rawSpec.steps : basePreset.steps;

  return {
    ...basePreset,
    ...rawSpec,
    actors,
    steps,
  };
}
