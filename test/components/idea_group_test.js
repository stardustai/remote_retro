import React from "react"
import { shallow } from "enzyme"
import IdeaGroup from "../../web/static/js/components/idea_group"
import styles from "../../web/static/js/components/css_modules/idea_group.css"

describe("IdeaGroup component", () => {
  const defaultProps = {
    actions: {},
    currentUser: {},
    currentUserHasExhaustedVotes: false,
    groupWithAssociatedIdeasAndVotes: {
      id: 5,
      label: "Internet Culture",
      ideas: [{
        id: 1,
        body: "I like turtles",
      }, {
        id: 2,
        body: "Memetown",
      }],
      votes: [],
    },
    stage: "action-items",
  }

  const propsWithVotes = {
    actions: {},
    currentUser: {},
    currentUserHasExhaustedVotes: false,
    groupWithAssociatedIdeasAndVotes: {
      id: 5,
      label: "Internet Culture",
      ideas: [{
        id: 1,
        body: "I like turtles",
      }, {
        id: 2,
        body: "Memetown",
      }],
      votes: [{}],
    },
    stage: "action-items",
  }

  it("renders a group label container", () => {
    const wrapper = shallow(
      <IdeaGroup {...defaultProps} />
    )

    const groupNameContainer = wrapper.find("GroupLabelContainer")

    expect(groupNameContainer.exists()).to.eql(true)
  })

  it("passes the first idea of the provided group to the voting interface as ideaToCastVoteFor", () => {
    const wrapper = shallow(
      <IdeaGroup
        {...defaultProps}
      />
    )

    const votingInterface = wrapper.find("VotingInterface")

    expect(votingInterface.prop("ideaToCastVoteFor")).to.eql({
      id: 1,
      body: "I like turtles",
    })
  })

  it("passes the currentUserHasExhaustedVotes value down to the voting interface", () => {
    const wrapper = shallow(
      <IdeaGroup
        {...defaultProps}
        currentUserHasExhaustedVotes
      />
    )

    const votingInterface = wrapper.find("VotingInterface")

    expect(votingInterface.prop("currentUserHasExhaustedVotes")).to.eql(true)
  })

  describe("when in the labeling-plus-voting stage", () => {
    it("renders a voting interface with isVotingStage true", () => {
      const wrapper = shallow(
        <IdeaGroup
          {...defaultProps}
          stage="labeling-plus-voting"
        />
      )

      const votingInterface = wrapper.find("VotingInterface")

      expect(votingInterface.prop("isVotingStage")).to.eql(true)
    })
  })

  describe("when in a stage other than labeling-plus-voting", () => {
    it("renders a voting interface with isVotingStage false", () => {
      const wrapper = shallow(
        <IdeaGroup
          {...defaultProps}
          stage="action-items"
        />
      )

      const votingInterface = wrapper.find("VotingInterface")

      expect(votingInterface.prop("isVotingStage")).to.eql(false)
    })
  })

  describe("when in action-items or close stage", () => {
    it("renders grayed-out if it has zero votes", () => {
      const wrapper = shallow(
        <IdeaGroup
          {...defaultProps}
          stage="action-items"
        />
      )
      expect(wrapper.hasClass(styles.grayedOut)).to.equal(true)
    })
    it("doesn't render grayed-out if it has one or more votes", () => {
      const wrapper = shallow(
        <IdeaGroup
          {...propsWithVotes}
          stage="action-items"
        />
      )
      expect(wrapper.hasClass(styles.grayedOut)).to.equal(false)
    })
  })

  it("renders an item for every idea associated with the given group", () => {
    const wrapper = shallow(
      <IdeaGroup {...defaultProps} />
    )

    const text = wrapper.find("li").map(li => li.text())

    expect(text).to.eql([
      "I like turtles",
      "Memetown",
    ])
  })
})
