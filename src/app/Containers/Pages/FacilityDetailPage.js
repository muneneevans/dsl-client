import React, { Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import { Grid, Segment, Tab, Header, Button, Card } from "semantic-ui-react"
import { Bar, ResponsiveBar } from 'nivo'
import { match } from "react-router"

import * as indicatorSelectors from "../../Store/Indicators/selectors"
import * as indicatorActions from "../../Store/Indicators/actions"
import * as facilitySelectors from "../../Store/Facilities/selectors"
import * as facilityActions from "../../Store/Facilities/actions"
import * as commodityActions from "../../Store/Commodities/actions"
import * as commoditySelectors from "../../Store/Commodities/selectors"
import * as staffSelectors from "../../Store/Staff/selectors"
import * as staffActions from "../../Store/Staff/actions"



import DataElementsForm from "../../Components/Forms/DataElementsForm"
import BarChart from "../../Components/Charts/BarChart"
import YearForm from "../../Components/Forms/YearForm"
import IndicatorGroupsForm from "../../Components/Forms/IndicatorGroupsForm"
import PeriodForm from "../../Components/Forms/PeriodForm"
import ProductsForm from "../../Components/Forms/ProductsForm"
import StaffForm from "../../Components/Forms/StaffForm"
import FacilityIndicatorCheckList from "../../Components/Widgets/FacilityIndicatorCheckList"

class FacilityDetailScreen extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.indicatorActions.fetchDataElements()
        this.props.facilityActions.fetchfacilityDetails(this.props.match.params.id)
        this.props.indicatorActions.fetchIndicatorGroups()
        this.props.indicatorActions.fetchPeriodTypes()
        this.props.commodityActions.fetchProducts()
        this.props.commodityActions.fetchFacilityProducts(this.props.match.params.id)
        this.props.staffActions.fetchJobTypes()
        this.props.staffActions.fetchCadres()
    }

    handleIndicatorGroupChange(indicatorGroupId) {
        this.props.indicatorActions.fetchIndicatorGroupIndicators(indicatorGroupId)
    }
    handleIndicatorChange(indicatorId) {
        this.props.indicatorActions.addFacilityIndicator(indicatorId)
    }

    handlePeriodChange(year) {
    }
    handleYearChange(year) {
        this.props.indicatorActions.setFacilityYear(year)
    }

    handlePeriodTypeChange(periodTypeId) {
        this.props.indicatorActions.setFacilityPeriodType(periodTypeId)
    }

    handleDataElementChange(dataElementId) {
        this.props.indicatorActions.fetchFacilityDataElementDataValues(this.props.match.params.id, dataElementId)
    }

    handleProductChange(productId) {

    }

    updateGraphs() {
        this.props.indicatorActions.fetchFacilityIndicatorValues(this.props.facilityDetails.id, this.props.facilityIndicators, this.props.facilityPeriodType, this.props.facilityYear)
        this.props.commodityActions.fetchFacilityYearProducts(this.props.match.params.id, this.props.facilityYear)
    }


    renderLoading() {
        return (
            <Segment size='large' loading />
        )
    }

    render() {
        return (
            this.props.facilityDetailsIsFetched ? (
                <Grid padded>
                    <Grid.Row>
                        {
                            this.props.facilityDetailsIsFetched ? (
                                <Header as='h2'>{this.props.facilityDetails.name}</Header>
                            ) : (
                                    <Header as='h3'>{this.props.match.params.id}</Header>
                                )
                        }
                    </Grid.Row>

                    <Grid.Row columns={4} className='ui large info message'>
                        <Grid.Column>
                            <Segment>
                                <Header as='h3' >Indicators</Header>
                                <IndicatorGroupsForm
                                    indicatorGroups={this.props.indicatorGroups}
                                    indicatorGroupIndicators={this.props.indicatorGroupIndicators}
                                    submitAction={this.handleIndicatorChange.bind(this)}
                                    handleIndicatorGroupChange={this.handleIndicatorGroupChange.bind(this)}
                                />
                            </Segment>
                        </Grid.Column>

                        <Grid.Column>
                            <Segment>
                                <Header as='h3' >Period</Header>
                                <PeriodForm
                                    periodTypes={this.props.periodTypes}
                                    handlePeriodTypeChange={this.handlePeriodTypeChange.bind(this)} />
                                <YearForm submitAction={this.handleYearChange.bind(this)} />
                            </Segment>
                        </Grid.Column>

                        <Grid.Column>
                            <Segment>
                                <Header as='h3'>Commodities</Header>
                                <ProductsForm
                                    products={this.props.facilityProducts}
                                    submitAction={this.handleProductChange.bind(this)} />
                            </Segment>
                        </Grid.Column>

                        <Grid.Column>
                            <Segment>
                                <Header as='h3'>Staff</Header>
                                <StaffForm
                                    cadres={this.props.cadres}
                                    jobTypes={this.props.jobTypes}
                                />
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row >
                        <Grid.Column>
                            <Segment vertical>
                                <FacilityIndicatorCheckList 
                                    facilityIndicators={this.props.facilityIndicators} 
                                    removeAction={(id)=>{this.props.indicatorActions.removeFacilityIndicator(id)}}/>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column>
                            <Segment>
                                <Button primary fluid
                                    onClick={this.updateGraphs.bind(this)}>Update</Button>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Row>
                            {
                                this.props.facilityIndicatorDataValuesMapData ? (
                                    <Segment>
                                        <Segment>
                                            <Card.Content header='Indicators' />
                                            <Bar
                                                data={this.props.facilityIndicatorDataValuesMapData.data}
                                                keys={this.props.facilityIndicatorDataValuesMapData.keys}
                                                indexBy={this.props.facilityIndicatorDataValuesMapData.indexBy}
                                                height={500}
                                                width={1500}
                                                margin={{
                                                    "top": 50,
                                                    "right": 60,
                                                    "bottom": 50,
                                                    "left": 100
                                                }}
                                                padding={0.2}
                                                innerPadding={0}
                                                minValue="auto"
                                                maxValue="auto"
                                                groupMode="grouped"
                                                layout="vertical"
                                                reverse={false}
                                                colors="nivo"
                                                colorBy="id"
                                                defs={[
                                                    {
                                                        "id": "dots",
                                                        "type": "patternDots",
                                                        "background": "inherit",
                                                        "color": "#38bcb2",
                                                        "size": 4,
                                                        "padding": 1,
                                                        "stagger": true
                                                    },
                                                    {
                                                        "id": "lines",
                                                        "type": "patternLines",
                                                        "background": "inherit",
                                                        "color": "#eed312",
                                                        "rotation": -45,
                                                        "lineWidth": 6,
                                                        "spacing": 10
                                                    }
                                                ]}
                                                fill={[
                                                    {
                                                        "match": {
                                                            "id": "Medical Clinic"
                                                        },
                                                        "id": "dots"
                                                    },
                                                    {
                                                        "match": {
                                                            "id": "Dispensary"
                                                        },
                                                        "id": "lines"
                                                    }
                                                ]}
                                                borderRadius={0}
                                                borderWidth={0}
                                                borderColor="inherit:darker(1.6)"
                                                axisBottom={{
                                                    "orient": "bottom",
                                                    "tickSize": 5,
                                                    "tickPadding": 5,
                                                    "tickRotation": 0,
                                                    "legend": "period",
                                                    "legendPosition": "center",
                                                    "legendOffset": 36
                                                }}
                                                axisLeft={{
                                                    "orient": "left",
                                                    "tickSize": 5,
                                                    "tickPadding": 5,
                                                    "tickRotation": 0,
                                                    "legend": "values",
                                                    "legendPosition": "center",
                                                    "legendOffset": -40
                                                }}
                                                enableGridX={false}
                                                enableGridY={true}
                                                enableLabel={false}
                                                labelSkipWidth={12}
                                                labelSkipHeight={12}
                                                labelTextColor="inherit:darker(1.6)"
                                                animate={true}
                                                motionStiffness={90}
                                                motionDamping={15}
                                                isInteractive={true}
                                            />
                                        </Segment >
                                    </Segment>
                                ) : (
                                        <div>
                                            {this.renderLoading()}
                                        </div>
                                    )
                            }
                        </Grid.Row>

                        <Grid.Row>
                            {
                                this.props.facilityYearProducts ? (
                                    <Segment>
                                        <Segment>
                                            <Card.Content header='Indicators' />
                                            <Bar
                                                data={this.props.facilityYearProducts.data}
                                                keys={this.props.facilityYearProducts.keys}
                                                indexBy={this.props.facilityYearProducts.indexBy}
                                                height={800}
                                                width={800}
                                                margin={{
                                                    "top": 50,
                                                    "right": 60,
                                                    "bottom": 50,
                                                    "left": 100
                                                }}
                                                padding={0.2}
                                                innerPadding={0}
                                                minValue="auto"
                                                maxValue="auto"
                                                groupMode="grouped"
                                                layout="vertical"
                                                reverse={false}
                                                colors="nivo"
                                                colorBy="id"
                                                defs={[
                                                    {
                                                        "id": "dots",
                                                        "type": "patternDots",
                                                        "background": "inherit",
                                                        "color": "#38bcb2",
                                                        "size": 4,
                                                        "padding": 1,
                                                        "stagger": true
                                                    },
                                                    {
                                                        "id": "lines",
                                                        "type": "patternLines",
                                                        "background": "inherit",
                                                        "color": "#eed312",
                                                        "rotation": -45,
                                                        "lineWidth": 6,
                                                        "spacing": 10
                                                    }
                                                ]}
                                                fill={[
                                                    {
                                                        "match": {
                                                            "id": "Medical Clinic"
                                                        },
                                                        "id": "dots"
                                                    },
                                                    {
                                                        "match": {
                                                            "id": "Dispensary"
                                                        },
                                                        "id": "lines"
                                                    }
                                                ]}
                                                borderRadius={0}
                                                borderWidth={0}
                                                borderColor="inherit:darker(1.6)"
                                                axisBottom={{
                                                    "orient": "bottom",
                                                    "tickSize": 5,
                                                    "tickPadding": 5,
                                                    "tickRotation": 0,
                                                    "legend": "months",
                                                    "legendPosition": "center",
                                                    "legendOffset": 36
                                                }}
                                                axisLeft={{
                                                    "orient": "left",
                                                    "tickSize": 5,
                                                    "tickPadding": 5,
                                                    "tickRotation": 0,
                                                    "legend": "values",
                                                    "legendPosition": "center",
                                                    "legendOffset": -40
                                                }}
                                                enableGridX={false}
                                                enableGridY={true}
                                                enableLabel={false}
                                                labelSkipWidth={12}
                                                labelSkipHeight={12}
                                                labelTextColor="inherit:darker(1.6)"
                                                animate={true}
                                                motionStiffness={90}
                                                motionDamping={15}
                                                isInteractive={true}
                                                legend
                                            />
                                        </Segment >
                                    </Segment>
                                ) : (
                                        <div>
                                            {this.renderLoading()}
                                        </div>
                                    )
                            }
                        </Grid.Row>
                    </Grid.Row>
                </Grid>
            ) : (
                    <Grid>
                        {this.renderLoading()}
                    </Grid>
                )
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        facilityDetailsIsFetched: facilitySelectors.getFacilityDetailFetchStatus(state),
        facilityDetails: facilitySelectors.getFaciliyDetails(state),

        indicatorGroups: indicatorSelectors.getIndicatorGroupsOptions(state),
        indicatorGroupIndicators: indicatorSelectors.getIndicatorGroupIndicatorsOptions(state),

        products: commoditySelectors.getProductOptions(state),
        facilityProducts: commoditySelectors.getFacilityProductOptions(state),
        facilityYearProducts: commoditySelectors.getFacilityYearProductGraphs(state),

        periodTypes: indicatorSelectors.getPeriodTypeOptions(state),

        facilityIndicators: indicatorSelectors.getFacilityIndicators(state),
        facilityPeriodType: indicatorSelectors.getFacilityPeriodType(state),
        facilityYear: indicatorSelectors.getFacilityYear(state),
        facilityIndicatorDataVailues: indicatorSelectors.getFacilityIndicatorDataValues(state),
        facilityIndicatorDataValuesMapData: indicatorSelectors.getFacilityIndicatorDataValuesMapData(state),

        jobTypes: staffSelectors.getJobTypeOptions(state),
        cadres: staffSelectors.getCadreOptions(state),


    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        indicatorActions: bindActionCreators(indicatorActions, dispatch),
        facilityActions: bindActionCreators(facilityActions, dispatch),
        commodityActions: bindActionCreators(commodityActions, dispatch),
        staffActions: bindActionCreators(staffActions, dispatch)
    }
}

const FacilityDetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FacilityDetailScreen)

export default FacilityDetailContainer